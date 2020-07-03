import {
	baseUrl
} from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			let formData = new URLSearchParams();
			for (var Key in data){
		    	formData.set(Key, data[Key]);
		    }
		   
			if(url != baseUrl+'/api/common/upload'){
				Object.defineProperty(requestConfig, 'headers',{
					value : {
						'Accept': 'application/json',
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				})
				Object.defineProperty(requestConfig, 'body', {
					value: formData
				})
			}else{
				let mydata = new FormData();
				for (var Key in data){
			    	mydata.append(Key, data[Key]);
			    }
				Object.defineProperty(requestConfig, 'body',{
					value : mydata
				})
			}
		}
		
		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}
			requestObj.open(type, url, true);

			let sendData = '';
			if(url != baseUrl+'/api/common/upload'){
				requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				if (type == 'POST') {
					for (var Key in data){
				    	sendData += Key + '=' + data[Key] + '&';
				    }
					sendData = sendData.substring(0, sendData.length -1);
				}
			}else{
				//requestObj.setRequestHeader("Content-type", "application/json;charset=UTF-8");
				let mydata = new FormData();
				for (var Key in data){
			    	mydata.append(Key, data[Key]);
			    }
				sendData = mydata;
			}
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
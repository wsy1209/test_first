<template>
    <section id='foot_guide'>
    	<svg style="position:absolute;width:0;height:0">
	    	<defs>
                <symbol viewBox="0 0 60 60" id="home"> 
                    <image width="60" height="60" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCgoPDjZupGVoAAADdElEQVRYw+3Zf2jUdRzH8cf3ds7NuRCRrJUarf6IJUlKQj8UoiTSPwJpiFaMGoGNGwrd0iWbVKu5GxTzr42YLrg/rH8WREhQKGEFRv1RQ0khhaVM8Eel4ua26w+H7W7f3Xa3hQn3uT++38/n/eP5/by/n8+H190FKbemRW4RtwAugAvgAvg2BEfDBldNJ7JMgy2S2lyZ2vnHWZtxRI1alWrV5JcjP3CgRlyFSyrE1QhyTxHNPUREtUbLfOGwtTZodNWnRmcXfL/F43rX/IznNav0nXaHHbXQ45pd9mVu6CBMCIxbXB+pFb35eCc9ZrlOVX7S4Bspgae1eVSfbb42qarIfXHdocxcRWOfhdZ6X5U+TQ5JIeWQJn2qfOCp2Sz1ID63H4xY6W2rHdPsoJExjxEHlXjXKi0afD9bYPhFL7jPZqud1KL3JvYGuleJZk/abZej0wNPZzvNAyu02+S0NgfSsDfQByScts5bVszejIdQpcFGZyT0GA7xGdajWKONhrTom/mMo0hZJK7aBQn7DE36ePskXFAt7sGZg1N4yJuqXbFHt6tZfK/qtscV1eIqpwIX7Q4Z7Pr3tl+/lZ4TSOhyaYpsg4677gmPKHVsvPfrOc/4d8MeUGyvTuenLqDzOu016lV17s3mmH1xLVZvuxFdOpybBhbO6VDqNW8Y1GFgMrdsMy63VUxEUruz08TCWe2SImK2Ks8dXCwmplxSq/4csNCvVVK5mJjicJfJSl2kXsxCSa1O5YiFU1rNtUXMkA8nHDiTgqNqbXOXXq1O5IGFE1qVecE2l3088dAJB79sp3t8Je5knlj4Vdw86+w0pDvTGP6O6y11RLPAGkvyxC6xRqDZEUvFwooa1n7zp11+8IkXNUmk2QJ3hkaNGkjTIJu84zOv2OG9sE0VDt4u4g8sUKI0w1asR6VImsBLGTVgQ9rJVqrEAhzxUpgoCgefGbsO4nqGLWK5ipCYuzNyXR+LT4VvxtxVZsrf6HZ83Ngydf6S0+84+cjbAPt9O27kYXW5KvR8v0mUpfXm554gX3CQpfefgmfcCuAC+H8ETuVhyQucqaQHw/QERjPEbzYFbjpH5rMZx0PUolC/+XakwZ6ZCbgM660PscyZkKVcS2h8XuBzLooqyhgdksoo5DUXBeak1WbEcDYtHhT+kyiAC+DbHvwPfzniAp6cUycAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTAtMTBUMTU6MTQ6NTQrMDg6MDDMP77NAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTEwLTEwVDE1OjE0OjU0KzA4OjAwvWIGcQAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=" /> 
                </symbol>

                <symbol viewBox="0 0 60 60" id="homeActive">
                    <image width="60" height="60" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABj1BMVEX/////oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH////Vif3EAAAAg3RSTlMAAAJKqlAEP8L2yUkBQL7IUgNBulgKLDkvudBfDQW99Ae//tppCQ44wf3ec8bXU7Piew/w6H8W7oEaiRiQHPKZI8TzoCtM3/qiMUepNkbKsjrL+7xCTUvHURXUYRTg3OnZrjtUT5RyCGX4M16wKmL1kZWNse91EhPb52pscXR8Mls+puC1xE0AAAABYktHRACIBR1IAAAAB3RJTUUH4QoKDyoBJ/EhwQAAAY1JREFUSMft1OkjwmAcwHGNVma6tBCJVch9577lTOVIjpRy3ze5+f3jFsWqrT3WK/R9+dvzebXf82RlZcr0t5NwhGXnSHGuDxIELJPnEnmkOJyvAAClSi0GawogEqGlUDGpK2QqwiSYrBg+05eUImJDmZGJKCc1FXQUg8lsQcT6j+OVVdVW+Kqm1oKG6yKn6xsagV1Tcws6blVa4zC0tXcg4+RsnV3iMRi7e8RjyO3tE8I4L4b+gUGhDRvixTA8Mpoaj9n5MYxPTKbA2BRBp8BAT8/wYtwxC6mjnS41Nybz3CDU3PwCyYkXhS2AVb7IhT1KBMu05E3Cy9oVNMvcudW1BCyb8JnW/bSgNDYF7BvBBBz0hjZDW+OC2L3tCalcCZjaMeCW3T1B3LivNuxQXEtyIIwPj/iW5JiNT6pPt86Yzi8uWVNnERL2X7Vc3zBR0tuf47A59vgH0sAaMfguihd+Ffbfp4FtD2ng1sd/gc1xF+gpih1h1lDxzIdfwrbvfLFf9epmTd90HDjT3+4dEw0SKAe01uwAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTAtMTBUMTU6NDI6MDErMDg6MDCqrkMLAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTEwLTEwVDE1OjQyOjAxKzA4OjAw2/P7twAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=" />
                </symbol>

                <symbol viewBox="0 0 60 60" id="category">
                    <image width="60" height="60" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCgoPLQ+PCJoBAAAC/ElEQVRYw+3XW4hVZRTA8d+eM2d0Tjoz2mUoB4ySHEMyYkqCmi4kYw9TpBVKiRKEPljQBXsqiEKKQq2eiggiuiAFFRkkTRdBMy80FikqOnktwm7TUDZn5kwPTsOePN8+c06dTNjraa+1vrX+ey32/r71RUNOjdScIm4KTsEpOAWn4NMAXFvc3LZfkzpRIKrfkEXWedQ9MqEcBg34xDy2jR1sirqE182hHo0mlSjsrDIrlldniV2BmJdNM4B+vGNlIMd8KxwvFxzhM3sC3r7Y82FbAqsuTmpF0sfVELBnZWLauGB8rlJwVSUFp+AU/J+ABwL2vPi9pxCMH6wUnAna46dWFIxP7Gb4kODFUXtyHHVhTLvJjECOcysBn4FLlYocj2bNCatySeHFZEnC5n9CtuIV3SVWHQk5ouL34zb/ppQzgdxbsuK37Y1pOZeZZrJIr2984ViplwmB1yR8rSfkwAg4o92NOlwyrPdYb72P/FwJuFejDYHQyDUa9A9rE93mIRc55nM/Kmg01VILrPG8b8sHZ7HcVwFvt1nDT/UWekKDj72hS4+C81zldnM8ImdluOqknzwbsGdiUe3uM8GrFnvBPgUctdZdVuuz2MJw8iRwTUn7BJ1adXnYoVErej3tJWebr6UScGm5wvW+87qDJ3n6vOVrs9xQHfBM0+30aVHfDhudaXZ1wM1qHC5SL/TaI6pWqzP+fkjGZSAp/z8D/4pJgcG/1jn4qTrg/X7QGjjFztfmuN3VAW+2xXS3FM1yndn26qoOuMc6f7jVnSd5rnW3JtttKhcc4ZeALx+bpt63VovHLdc6sv1OtcCTLseU4HSScJtnrgsCMU2xmlebqNNzPvChfQa1aDdP1mZZc6zygJ3lgMfj2cQ2/7WTf+l+B3S6WsdIR47a6Cn1Vpmr1mM2jB3crSE4ZVIwFPtRDlrhNTe7UouC7+3wnk1+w4Oe0W5ZMXBo9GkqOQj0yY/Sx6mTQUHe7yPWDnd4c9u7YwZXX/6XV5gUnIJPT/CfVpqpiS4+4D0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTAtMTBUMTU6NDU6MTUrMDg6MDBwl3z/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTEwLTEwVDE1OjQ1OjE1KzA4OjAwAcrEQwAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=" />
                </symbol>

                <symbol viewBox="0 0 60 60" id="categoryActive">
                    <image width="60" height="60" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABklBMVEX/////oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH///+9tXUDAAAAhHRSTlMAAN7uwBjitvfWG/vKzhrywxzScXliDHNdLVtyeG5RHy5+/vGwax1Ev/S+npely6MsOdNjIgMxe9muIBW7tylJ/I0CV/nYMquCCK/2fxbhQBkSCpkGhbMUONTo52kFEZQOB3xtFyOS9bpkJTzVCXT9TT7Qqid1vePq16xeO9EQBA9Bok5TswGLAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+EKCg8vBV3rEZ0AAAF9SURBVEjHY2AYBaNgFAxHwMSMClgYWdnQhNgZGXFo5mhBBZyMXNxoQjw4NTOjqeRl5ONHExIY1TyqecRpRlPYwsQoiC4khFOzsAgqEGUUE0cTksCpmZEoQLTNECApJS0jKyePXzOmn0FAQVFACchRVlFVw6cZM7SBQF2jRVNLW0dXr6VF34BEzYZGLQLGJoyMpmbmFi2WViRptrZpsbWDetae08HRlATNTs4ubGbwcJbgd3UjQbOYu4uHJ1yzmpe3Dwmaff1c/BEx7CTcYklK2uZwkUdKH84tLCRoDlB2sUPSLNpiS4LmQD0XCYTeIEelYBI0h4Q6hIXDNUdERkmREs9u0S0xsVC9cfEtNgmkaE5M4vBOTgEmDUbP1LSWFpAzSEieYvHpLRmZblnZIjkt0X4O+inE189AkJvHlJ4P5HDz8xQUFrUUG+DQ7BqFCmzAXjUtKS0rr6isqg5gZKyp5dbFobkuDhUkQEOqXqwuriHICcRsbGpmGAUjDQAAFtSrkd99kXcAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTAtMTBUMTU6NDc6MDUrMDg6MDC4yKxcAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTEwLTEwVDE1OjQ3OjA1KzA4OjAwyZUU4AAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAASUVORK5CYII=" />
                </symbol>

                <symbol viewBox="0 0 60 60" id="cart">
                    <image width="60" height="60" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAQAAACQ9RH5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCgoPMBGKa8t+AAACl0lEQVRYw+2ZzWsTQRiHn9U0djdtEGlARajag0nxKEEQBA+CIihEvfTiRbwqeK1HycmrJ/+CUkQravEDxCIoWHuyEa1tisVSm4PUJLamzXjIR5tkJjs7GyiFfReS3Xl/O8/+3szO7BJLsD2xa5u4ATgAB+AAHIB3ADjU2mS9IkmeVdZYoUSONB/8YlrXQAmYMA42IBBAmIMkO+/Yar0WK4ZDDzZhenF4yDpdnXcsAzceLtPHIZb8ccVGc1PI9aQu4B3rPsyWmWTIO3gD6PflF6KtTe7gUW5wnwfGfm9xjdcm4E9AiSljtwPAqPSSmremuIBg3BjbT4k80VaK+8w1BxwxBp8nxFtWTBxHKPPXeGp9ieC6lOIKhl8I9hth91GkxAEZRcdJFjhqBD6DzSSLspQu+LAR+DLwWJ7SAc8Zgrs5CzwyB5s6TtLHN76Yg+cxmzRTwFNUr6Mao3oQwVfPWItZBKeUFA1w5U7e7RF8HMESYRVYp9QFcnSzxyP4EvCCf6q0+yIB8IMYd/npCTyEfHGohUap4ZlE5r7NsFdN0XM8A0x5ftYc57c6qQeeBia46RHcNvRWnXkg0UmsruNZ4BhXPPad402brNbgirBoNLjaUPQcFxjmqudqfm6XlDzQR3GPP5K23jYarXenuIo2QAxY5jtkgPyWVE/tvCaNOiTgsrQyXOQ2J4H33GMsLiBDoZqMEAfKEo2nUp+Q6U7zHKe6X+QcE2AxTRFwGKyUUqKpxceWDnWfHofrXYLDHQBBAhubRO0XlGj8Oy5s6RRWsSv1F/VPlcav48blba3yJbA2sQqNKnTBTxqOxmo7DROOQuMPnCZbHe5lsqSNNZ7BGVKMsMACI6QUt6iOph5W8J9EAA7AOx78H9MhYKEufsRNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTEwLTEwVDE1OjQ4OjE3KzA4OjAwEvbmZgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0xMC0xMFQxNTo0ODoxNyswODowMGOrXtoAAAAZdEVYdFNvZnR3YXJlAEFkb2JlIEltYWdlUmVhZHlxyWU8AAAAAElFTkSuQmCC" />
                </symbol>

                <symbol viewBox="0 0 60 60" id="cartActive">
                    <image width="60" height="60" x="0" y="0" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABiVBMVEX/////oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH/oQH///8mlKpOAAAAgXRSTlMAALz26uHYzMqeH7Ls7e7v9P6gBBAYICVbwSjQIeI9JyMZ1qN3CIb6LwFo0glIggUyOPXdDdWOBxe4QJnnEn6bYP1LQzGoCwLyi24V8y1ne3Zd3KuMDivrGgMwRzoGKqHFsVq0wpQdReB4xlSuOfw8iaUicfnLFmmit/tRVc8U40mcIygmAAAAAWJLR0QAiAUdSAAAAAd0SU1FB+EKCg8xF3oTXwoAAAGFSURBVEjH7dRXU8JAFAVgFmMBEYggAhZEAY0gKiB2kSI2bFhRsSAiNuy95p+LgcngTHKX2Scfch7P7DeT3N25MpkUKVL+Z+QVVGVVdY1CieAI4lpVnVqj0dL1JBjp9A2GRiNrIsJczHQTOW6mWlotUNoAbDWxcNoBrO+ALW0DsN0B484uADPdMHa6AIx6YOzuhXAfjPuhq0JmD2S9PhAbBiDsHwTx0DCERxgQ+0YBOzYOPk+kmwBwwAVjNMkGRXGIweCwONZYEQZHxL96KorDZkoUG6dxWOmcmZ0Tjh7h8Lw8tkC4SRCKBthFYswsscvEGK2w8VXhrK1j8cam6Li3sDixvSOS3SQWk+9tLnv7B4ehPyJ1lD7OlIVPsvnfo05LrF+db+KRMnDmjBuOKsw351quucC/MHRJF0br5htFocgZ8PiqeC/XfHNTbG7x2OLlTnpSfHN3zzUPj3iceMrlTwafk3xjf/ndD69vTBnT1r1/eLK2aMm0Px1fsfR3QnzaUqQI5wcpkEZRD61ZBQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMC0xMFQxNTo0OToyMyswODowMIf0rqgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTAtMTBUMTU6NDk6MjMrMDg6MDD2qRYUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==" />
                </symbol>

                <symbol viewBox="0 0 60 60" id="profile">
                    <image width="60" height="60" x="0" y="0" xlink:href="data:image/png;base64,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" />
                </symbol>

                <symbol viewBox="0 0 60 60" id="profileActive">
                    <image width="60" height="60" x="0" y="0" xlink:href="data:image/png;base64,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" />
                </symbol>

	    	</defs>
    	</svg>
        <section @click = "gotoAddress('/home')" class="guide_item">
        	<svg class="icon_style">
                <use :xlink:href="$route.path.indexOf('home') !== -1? '#homeActive' : '#home'"></use>
            </svg>
            <span>商城首页</span>
        </section>
        <section @click = "gotoAddress('/category')" class="guide_item">
        	<svg class="icon_style">
                <use :xlink:href="$route.path.indexOf('category') !== -1? '#categoryActive' : '#category'"></use>
            </svg>
            <span>订货分类</span>
        </section>
        <section @click = "gotoAddress('/cart')" class="guide_item">
            <div class="cart_num">{{cartTotalNum()}}</div>
        	<svg class="icon_style">
                <use :xlink:href="$route.path.indexOf('cart') !== -1? '#cartActive' : '#cart'"></use>
            </svg>
            <span>购物车</span>
        </section>
        <section @click = "gotoAddress('/profile')" class="guide_item">
        	<svg class="icon_style">
                <use :xlink:href="$route.path.indexOf('profile') !== -1? '#profileActive' : '#profile'"></use>
            </svg>
            <span>个人中心</span>
        </section>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
    	data(){
            return{
                
            }
        },
        created(){
           
        },
        mounted(){
            
        },
        computed: {
            ...mapState([
                'userInfo','cartList',
            ]),
            /**
             * 监听cartList变化，更新当前用户的购物车信息userCart，同时返回一个新的对象
             */
            userCart: function (){
                if(this.userInfo){
                    return Object.assign({},this.cartList[this.userInfo.id]);
                }else{
                    return '';
                }
            },
        },
        methods: {
        	gotoAddress(path){
        		this.$router.push(path)
        	},
            cartTotalNum(){
                let buyNum = 0;
                if (this.userCart) {
                    for(let warehouseCode in this.userCart){
                        for(let specId in this.userCart[warehouseCode]['goodsList']){
                            buyNum += this.userCart[warehouseCode]['goodsList'][specId].buyNum;
                        }
                    }
                }
                return buyNum > 999 ? '99+' : buyNum;
            },
        },

    }

</script>

<style lang="scss" scoped>
    @import '../../style/mixin';

    #foot_guide{
        background-color: #fff;
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        @include wh(100%, 1rem);
        clear: both;
        box-shadow: 0 -0.01rem 0.025rem rgba(0,0,0,.1);
    }
    .guide_item{
        display: block;
        float: left;
    	width: 25%;
    	text-align: center;
        font-size: 0;
        position: relative;
        .cart_num{
            display: block;
            position: absolute;
            top: .05rem;
            left: 50%;
            margin-left: .2rem;
            min-width: .3rem;
            height: .3rem;
            padding-left: .05rem;
            padding-right: .05rem;
            line-height: .3rem;
            font-size: .24rem;
            color: #fff;
            background: #ff4400;
            border: none;
            border-radius: .15rem;
        }
		.icon_style{
            display: inline-block;
			@include wh(.6rem, .6rem);
		}
		span{
            display: block;
			@include sc(.24rem, #666);
		}
    }
   
</style>

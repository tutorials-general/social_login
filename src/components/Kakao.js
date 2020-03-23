import React,{useEffect} from 'react'
import {kakao} from '../config'

export default function Kakao() {

    useEffect(()=>{
        window.Kakao.init(kakao.kakaoKey);
        // 카카오 로그인 버튼을 생성합니다.
        window.Kakao.Auth.createLoginButton({
          container: '#kakao-login-btn',
          success: onSuccess,
          fail: function(err) {
             alert(JSON.stringify(err));
          }
        });
    })
    return (
        <div>
            <a id="kakao-login-btn">login</a>
            <a href="http://developers.kakao.com/logout">logout</a>
        </div>
    )
}

const onSuccess = (authObj) => {

    console.log(JSON.stringify(authObj,null,2));
    window.Kakao.API.request({
        url: '/v2/user/me',
        success: function(res) {
          alert(JSON.stringify(res,null,2));
        },
        fail: function(error) {
          alert(JSON.stringify(error));
        }
      });
}

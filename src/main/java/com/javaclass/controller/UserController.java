package com.javaclass.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.javaclass.domain.UserVO;
import com.javaclass.service.UserService;

@Controller
@RequestMapping("user-pages")
public class UserController {

	@Autowired
	private UserService userServiceImpl;
	
	@RequestMapping("/insertUser.do")
	public void insertUser(UserVO vo) {
		userServiceImpl.insertUser(vo);
	}

	@RequestMapping("/login.do")
	public String login(UserVO vo, HttpSession session) {
		System.out.println(vo);
		UserVO result = userServiceImpl.loginCheck(vo);
		System.out.println(result);
		System.out.println(session);
		if(result==null) {
			return "authentication-pages/sign-in"; //닉네임이 틀렸습니다 떠야함
		}else {
			session.setAttribute("logname", result.getUserName());
			return "user-pages/loginConfirm";
		}
	}
	
	@RequestMapping("/findPassword.do")
	public String findPassword(UserVO vo, HttpSession session) {
		userServiceImpl.findPassword(vo);
		System.out.println(vo);
		UserVO result = userServiceImpl.loginCheck(vo);
		System.out.println(result);
		System.out.println(session);
		if(result==null) {
			return "authentication-pages/forgot-password";
		}else {
			session.setAttribute("logname", result.getUserPassword());
			return "authentication-pages/reset-password";
		}
	}
	
}

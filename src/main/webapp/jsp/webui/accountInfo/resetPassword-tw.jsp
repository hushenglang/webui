<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!--修改密碼 begin-->
<div class="layer-box dn" id="resetPasswordBox">
  <div class="layer-con layer-con-weit">
    <div class="borConbox">
        <table border="0" cellspacing="0" cellpadding="0" class="layer-tablist layer-pwd">
         <tbody>
           <tr>
            <th class="acc-th" ><span class="red">*</span> 賬&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;號：</th>
            <td>
				<input readonly type="input" id="reset_accountname_readonly" value="${SESSION_ADMIN_LOGIN_INFO.fcustomersParam.loginname} (GTS)" class="input-text" />
			</td>
           </tr>
           <tr class="tr-bg">
            <th>請輸入現有密碼：</th>
            <td><input type="password" id="resetpwd_oldpwd" value="" class="input-text" /></td>
           </tr>
           <tr>
            <th>請輸入新密碼&nbsp;&nbsp;&nbsp;&nbsp;：</th>
            <td><input type="password" id="resetpwd_newpwd" value="" class="input-text" /></td>
           </tr>
           <tr class="tr-bg">
            <th>請再輸入新密碼：</th>
            <td><input type="password" id="resetpwd_confirmnewpwd" value="" class="input-text" /></td>
           </tr>
         </tbody>
        </table>
        <p class="pwd-p-info " id="pwd_p_info_format_error">温馨提示：GTS平臺密碼必須為8位數字。</p>
        <p class="pwd-p-info dn" id="pwd_p_info_confirm_error">提示：2次密碼輸入不一致。</p>
        <p class="pwd-p-info dn" id="pwd_p_info_success">提示：密碼修改成功。</p>
        <p class="pwd-p-info dn" id="pwd_p_info_error"></p>
        <p class="more-lls-btn gez-btninfo"><a href="javascript:" id="reset_password_submit_btn" class="sure_btn">提交</a><a href="javascript:" id="reset_password_reset_btn">重設</a></p>
    </div>
  </div>
</div>

<script type="text/javascript">

$(function(){
	function validateInput(oldpwd, newpwd, confirm_newpwd){
		$(".pwd-p-info").hide();
		if(Util.isEmpty(oldpwd.val())||oldpwd.val().length!=8){
			$("#pwd_p_info_format_error").show();
			oldpwd.focus();
			return false;
		}
		if(Util.isEmpty(newpwd.val())||newpwd.val().length!=8){
			$("#pwd_p_info_format_error").show();
			newpwd.focus();
			return false;
		}
		if(confirm_newpwd.val()!=newpwd.val()){
			$("#pwd_p_info_confirm_error").show();
			confirm_newpwd.val("");
			newpwd.val("");
			newpwd.focus();
			return false;
		}
		return true;
	}
	
	 $("#reset_password_submit_btn").click(function(){
			var oldpwd = $("#resetpwd_oldpwd");
			var newpwd = $("#resetpwd_newpwd");
			var confirm_newpwd = $("#resetpwd_confirmnewpwd");
			var flag = validateInput(oldpwd, newpwd, confirm_newpwd);
			if(flag){
				$.post(Global.contextPath + "/ResetPassword.action",{"oldpassword":oldpwd.val() ,"newpassword":newpwd.val()}, 
						function(result){
							if("success"==result.code){
								$("#pwd_p_info_success").show();
								AlertWithOK("修改密碼成功，請使用新密碼重新登陸！", function(){
									location.href = 'LogOff.action?nodeSid=' + nodeSid;	
								});
							}else{
								var errorMsg = getErrorMsgByCode(result.errorCode);
								$("#pwd_p_info_error").text(errorMsg);
								$("#pwd_p_info_error").show();
							}
						}
					);
			}
			
			function getErrorMsgByCode(errorCode){
				if(errorCode=='1028'){
					return "提示：現有密碼錯誤，請重新輸入。";
				}else if(errorCode=='1026'){
					return "提示：GTS平臺密碼必須為8個字符的數字。";
				}else if(errorCode=='11026'){
					return "提示：新舊密碼不能相同。";
				}else{
					return "提示：密碼修改失敗。";
				}
			}
		});

	$("#reset_password_reset_btn").click(function(){
		$("#resetpwd_oldpwd").val("");
		$("#resetpwd_newpwd").val("");
		$("#resetpwd_confirmnewpwd").val("");
	}); 

});


</script>
<!--修改密碼 end-->
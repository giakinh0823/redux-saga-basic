# Mini project - Student management

/login: 
/admin: layout

/admin/*
feature /admin/dashboard
feature /admin/student

auth / authentication

- login
- sign up / register
- forget password


CLICK LOGIN
- call api to login
- success -> redirect to admin dashboard
- failure -> show error


LOGIN
LOGOUT

LOOP
- if logged in, watch LOGOUT
- else width LOGIN

LOGIN
- call login api to get token + user info
- Set token to localStorage
- redirect to admin dashboard

LOGOUT
- clear token from localStorage
- redirect to login


authSlice
authSaga


STUDENT


module.exports = {
	server_port: 3000,
	db_url: 'mongodb://localhost:27017',
	db_name:'local',
	route_info: [
	    //===== Users =====//
		{file:'./main_page', path:'/', method:'homepage', type:'get'},
		{file:'./main_page',path:'/login',method:'loginpage',type:'get'},
		{file:'./main_page',path:'/process/logout',method:'processLogout',type:'post'},
		{file:'./loginReg_page',path:'/process/login',method:'processLogin',type:'post'},
		{file:'./loginReg_page',path:'/register/stu',method:'registerPageStu',type:'get'},
		{file:'./loginReg_page',path:'/register/biz',method:'registerPageBiz',type:'get'},
		{file:'./loginReg_page',path:'/process/register/stu',method:'processRegisterStu',type:'post'},
		{file:'./loginReg_page',path:'/process/register/biz',method:'processRegisterBiz',type:'post'},
		//===== Programs =====//
		{file:'./program_page',path:'/program/list',method:'programListPage',type:'get'},
		{file:'./program_page',path:'/program/biz/add',method:'programAddPage',type:'get'},
		{file:'./program_page',path:'/process/program/add',method:'processProgramAdd',type:'post'},
		{file:'./program_page',path:'/program/details/:id',method:'programDetailsPage',type:'get'},
		{file:'./program_page',path:'/program/biz/update/:id',method:'programUpdatePage',type:'get'},
		{file:'./program_page',path:'/process/program/biz/update/:id',method:'processProgramUpdate',type:'post'},
		{file:'./program_page',path:'/process/program/stu/apply/:id',method:'processProgramApply',type:'post'},
		{file:'./program_page',path:'/program/biz/mylist',method:'programBizMylistPage',type:'get'},
		{file:'./program_page',path:'/program/stu/mylist',method:'programStuMylistPage',type:'get'},
		{file:'./program_page',path:'/stulist/biz/manage/:id',method:'stulistManagePage',type:'get'},
		{file:'./program_page',path:'/process/accept/stu/:id/:applyer',method:'processAcceptStu',type:'post'},
		//===== Praclog =====//
		{file:'./praclog_page',path:'/praclog/list/:userId/:programId',method:'praclogListPage',type:'get'},//유저ID + 프로그램ID
		{file:'./praclog_page',path:'/praclog/stu/add/:id',method:'praclogAddPage',type:'get'},
		{file:'./praclog_page',path:'/process/praclog/stu/add/:id',method:'processPraclogAdd',type:'post'}
		//실습일지 수정하기
		//실습일지 확인하기
		//실습완료시키기


	]
}
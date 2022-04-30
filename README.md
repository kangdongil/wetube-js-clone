# 1.1 Project Requirements
  - HTML/CSS
    - Box Model
	- Flex
  - Git
    - Commit
	- Push
  - JavaScript
    - Event
	- Variable
	  - const
	- Function
	  - Arrow Function
  - Chronium Browser
  - VSCode(>GoormIDE)
  - NodeJS
  
# 1.3 NodeJS란
  - Browser 밖에서 사용할 수 있는 JavaScript
  - Javascript는 브라우저에 Interactivity를 주기 위해 고안됨
  - Javascript는 브라우저와 함께 배포되었으며, 프론트엔드에서 사용되는 유일하게 주된 프로그래밍 언어임
  - NodeJS를 기초해 다양한 프레임워크들이 생겨났다
    - ReactJS: Facebook이 만든 VirtualDom방식으로 보다 Interactive한 웹을 만들 수 있게 됨
	- ElectronJS: HTML/CSS/JS로 데스크톱 앱을 만들 수 있음. ex) VSCODE
    - ReactNative: JavaScript로 Android, iOS 어플을 만들 수 있음

# 1.4 NPM이란
  - JavaScript Package Manager
  - 커뮤니티의 유용한 NodeJS 코드를 끌어쓸 수 있음.
  - nodeJS와 함께 설치됨
  - `npm install [패키지이름]` 또는 `npm i ~`
  
# 2.0 프로젝트 시작하기
  - 프로젝트 폴더 만들기
    - `mkdir ~`
	- src 폴더로 파일관리하기
	  - `mkdir src/`
  - Git
    - `git init`
	- GitHub에서 새로운 Respository 만들기
	- `git remote add https://github.com/[계정이름]/[프로젝트이름]`
	- 프로젝트 Commit하기
	- `git push origin master` 또는 `git push origin main`
  - NodeJS
    - `npm init`
  * `.json`: 데이터를 객체 포맷으로 저장한 파일.

# 2.1 nodeJS 실행하기
  1. Node 명령어 이용하기
     - `node [JS파일경로]`
  2. `package.json` `script` 이용하기
     - `script` 안에 `"dev": "node index.js"` 추가하기
	 - console: `npm run [SCRIPT]`
  3. Babel + Nodemon
     - Babel: 최신 자바스크립트를 Browser가 이해할 수 있는 안정된 코드로 변환함
	   - `npm install @babel/core @babel/preset-env @babel/node --save-dev`
	   - `touch babel.config.json`
	   - `{"presets": ["@babel/preset-env"]}`
	   - 서버시작 script를 `babel-node [JS파일명].js`로 수정
	 - Nodemon: 파일저장할 때마다 서버 새로고침함
	   - `npm i nodemon -D`
	   - 서버시작 script 앞에 `nodemon --exec` 추가하기
  
# 2.1.1 NodeJS 프로젝트 구조 살펴보기
  - `package.json`
    - NodeJS 프로젝트에 대한 설명을 내용으로 함.
	- `npm i`로 프로젝트에 필요한 패키지를 자동 설치한다.
	- `scripts`
	  - 간단한 항목명(entry)으로 명령어들을 일괄 실행함
	  - `"[항목명]": "[명령어들]"`
	  - `npm run [항목명]`으로 실행한다
	- `dependencies`
	  - 프로젝트가 작동하기 위해 필요한 패키지들
	- `devDependencies`
	  - 프로젝트 개발에만 사용되는 패키지들(배포할 때 제외됨)
	  - 패키지를 설치할 때 `--save-dev` 또는 `-D` 추가하기
  - `node_modules/`
    - npm으로 설치한 프로젝트의 패키지들을 저장하는 폴더.
	- 패키지간 위계는 package.json에서 기술하며, 파일 경로상 위계는 동등하다
  - `package-lock.json`
    - 패키지 버전관리하는 파일

# 2.3 NodeJS 패키지 Import & Export하기
  - NodeJS 파일은 환경독립적이다
    - 각 파일마다 import와 export를 개별적으로 해야한다
  - Import
    - 구JS 코드: `const [변수명] = require("[패키지명]");`
	- `import [변수명] = "[패키지명]";`
  - Export
    - 무언가 import하기 전에 export를 해야 한다
    - Export Default
	  - js파일의 대표 variable을 export할 때,
	  - js파일 마지막문에 `export default [variable명];`라 쓴다
	  - import하려면 `import [임의명] from "[파일 경로]";`
	- Export
	  - js파일의 여러 variable을 export할 때 적합함
	  - variable마다 맨앞에 export를 붙인다
	  - import하려면 `import { ... } from "[파일 경로]"`

# 3.0 Express로 서버 구동하기
  1. Express를 import하기
     - `import express from "express";`
  2. Express Application을 변수에 지정하기
     - `const app = express();`
  3. Express가 request에 listen하게 하기(서버 시작)
     - `app.listen(PORT, CALLBACK)`
  
  * Port: 컴퓨터와 서버 접속을 관리하는 문.
  * GoormIDE에서 포트 설정법
    - 로컬PC: `http://localhost:${PORT}/`
	- GoormIDE: [프로젝트] - [실행 URL과 포트]

# 3.1 GET Request로 서버에게 웹페이지 요청하기
  - HTTP 방식: 서버와 브라우저간 데이터를 주고받는 방식
  - GET Request: 웹페이지 관련한 데이터를 요청하는 것
    - `app.get("[URL]", [CONT])`
    - [CONTROLLER] 함수는 `req`(request), `res`(response) object를 argument로 가짐.
	- `res`를 return하면 request가 완료된다
	- `req`: request가 가진 정보를 담은 object
	  - `req.url` 또는 `req.path`
	  - `req.method`
    - `res`: request에 대해 서버가 응답하는 방식
	  - `res.end`
	  - `res.send`: 텍스트, JSON, 짧은 HTML 보내기
	  - `res.render`
	  - `res.redirect`
	  
  * `/`: 서버의 Root 페이지
  
# 3.5 Middleware 알아보기
  - Middleware: Request와 Response 사이에 들어가는 Controller
  - Controller: Express 서버를 이루는 Function
  - Middleware는 req, res 외에 next라는 argument를 가진다
  - `app.get`으로 Middlware 만들기
    - `app.get([ROUTE], [CALLBACKs])`
	  - [CALLBACKs]: `[MIDDLEWARE]..., [CONT]`
	- Middleware는 `next()`로 다음 controller로 넘어갈 수 있다
	- 마지막 Controller는 response를 한다
	- `app.get`은 특정 URL을 접속할 때만 작동하는 Middleware에 적합함.
  - `app.use`로 Middleware 만들기
    - `app.use`는 공통적으로 작동하는 Middleware에 적합함.
	- `app.use([MIDDLEWARE명]);`
	- 코드 순서상, `app.get` 앞에 위치해야 함

# 3.6 유용한 Middleware 사용하기
  - Morgan
    - `npm i morgan`
	- morgan("dev")
	
# 4.0 Router란,
  - Router: URL과 Controller 관리를 도와줌.
    - Router는 URL의 공통부분을 묶어 중복을 줄일 수 있다
  - Router 계획하는 법
    - 프로젝트에 어떤 종류의 데이터가 주가 될지(Domain) 생각하기
	  - Wetube = Video + User
	- 데이터를 다룰 때 어떤 기능이 필요한지 생각하기(CRUD)
	  - User: join / login / logout / edit-profile / delete-profile
	  - Video: upload / search / watch / edit / delete
    - 무슨 그룹으로 묶을지 생각하고 각각을 Router로 정한다
	  - Global Router: `/`(루트 URL)을 기준으로 하는 URL의 집합
	  - User Router
	  - Video Router
  - Router 계획하기
    - Global Router
      - / -> Home
      - /join -> Join
      - /login -> Login
      - /search -> Search
    - User Router
      - /users/:id -> See User
      - /users/logout -> Log Out
      - /users/edit -> Edit MY Profile
      - /users/delete -> Delete MY Profile
    - Video Router
      - /videos/:id -> See Video
      - /videos/:id/edit -> Edit Video
      - /videos/:id/delete -> Delete Video
      - /videos/upload -> Upload Video
	
# 4.5 Router 구축하기
  - Router 만들기
    - `const [Router명] = express.Router();`
	- `[Router명].get([Route], [CONT])`
  - Router 파일별로 분리하기
    - `mkdir src/routers`
	- `touch src/routers/[router명].js`
	  - `import express from "express";`
	  - `export default [Router명];`
	- server.js
	  - `import [Router명] from "./routers/[Router명].js";`
  - Controller 파일별로 분리하기
    - Router와 Controller는 분리하는 편이 좋다
	- `mkdir src/controllers`
	- `touch src/controllers/[controller명].js`
	  - Controller마다 맨앞에 export 넣기
	  - `export const [CONT명] = ...`
	- router.js
	  - `import { [CONT명], ... } from "../controllers/[CONT명].js"`

# 4.7 URL 변수 사용하기(URL Parameter)
  - URL Parameter: URL에 변수를 사용하게 함
  - URL에 변수를 사용하려면 `:[변수명]` 형식을 지키기
  - `req.params`로 변수들이 담긴 object를 return함
  - 변수가 포함된 Route는 아랫줄에 두기(위에서 아래로 코드가 실행되므로)
  - 변수의 형태를 제한하려면 Regular Expression을 사용한다
    - Express Reg
	  - ? / + / *
    - JavaScript Reg
	  - `\\d` / 
	- MongoDB Reg
	  - `[0-9a-f]{24}`
	  
# 5.1 Pug 알아보기
  - Pug: HTML 작성을 돕는 템플릿 엔진
  - `npm i pug`
  - server.js
    - `app.set("view engine", "pug");`
    - `app.set("views", process.cwd() + "/src/views");`
	  - views 폴더 경로를 정한다
	  - cwd(현재작업폴더)는 node가 시작되는 곳이 기준이다
  - pug파일 render하기(Controller)
    - render: javascript를 미리 실행한 결과물을 제공하는 것
	- `return res.render("[PUG파일명]");`
  - render할 때 Variable 보내기
    - res.render("[PUG명]", {[변수명]: [변수값]});
	- Template에서 변수 사용하기
	  - `#{[변수명]}`
	  - 텍스트 안 변수는 Backtick과 `${}`을 사용하기
	  
# 5.2 Pug 문법구조 살펴보기
  - Pug 파일 문법구조
    - 파이썬처럼 Tab키나 Whitespace로 위계 구분
	- 변수만을 내용으로 가질 때, `[태그명]=[변수값]`이 가능하다
	  - `h1 #{pageTitle}` >> `h1=pageTitle`
  - Partials
    - partial: 고정된 내용이 반복이 될 때
    - `mkdir src/views/partials`
	- `include partials/[PUG파일명].pug`
  - Base
    - pug파일간 상속(Inheritence)할 수 있다는 점을 이용함.
	- `touch src/views/base.pug`
	- base파일을 상속받으려면, `extends base`하기
	- base파일에 block를 설정해 파일만의 내용을 넣을 수 있다
	  - `block content`(base파일&개별파일)
  - Conditionals
    - `if [조건]`
	- `else`
	- `if else [조건]`
  - Iteration
    - Array나 Object 내 개체에 대해 html객체를 반복하여 생성함
	- `each [ITEM] in [LIST]`
	- `else`를 하면 목록이 비었을 경우도 대처할 수 있다
  - Mixins
    - 동적 데이터를 받을 수 있는 HTML 블록
	- 데이터 형식을 같지만 변형하여 재사용 가능하다
	- `mkdir src/views/mixins`
	- `touch src/views/mixins/video.pug`
	- mixins
	  - ```
	  mixins [Mixin명]([받아온 데이터])
	  ~~
	  ```
	- template
	  - `include mixins/[mixin명]`
	  - `+[mixin명](받아올 데이터)`
	- mixin은 iteration과 함께 사용한다

# 6.0 백엔드에 데이터 보내는 원리 이해하기
  - CRUD: Create / Read / Update / Delete
  - POST Method: Form에 입력한 내용을 DB로 보내는 목적
  - Watch Video 구현하기[R]
    - Controller
	  - 컨트롤러 home에서 video 보내기
	  - 컨트롤러 watch에서 id 받아오기
	  - 컨트롤러 watch에서 video.title 받아 pageTitle로 사용하기
	- Template
	  - `video.id`로 링크 구현하기
  - Edit Video 구현하기[U]
    - Router
	  - 같은 URL로 GET과 POST하기(edit)
	  - `app.route("[URL]").get([CONT]).post([CONT])`
	  - import한 function명 수정하기(`edit` >> `getEdit`)
    - Controller:getEdit
	  - 기존 edit은 getEdit으로 수정하기
	- Controller:postEdit
	  - 웹페이지 id를 받아와 redirect하기
	  - req.body에서 title을 받아와서 array값 수정하기
	- Template
	  - 템플릿 watch에 edit 페이지 링크를 추가하기
	  - 템플릿 edit에 title을 수정하는 form 만들기
	  - form 안 input은 name 속성 가지기
  - Upload Video 구현하기[C]
    - Router
	  - 같은 URL로 GET과 POST하기(upload)
	  - `getUpload`와 `postUpload` import하기
	- Controller:getUpload
	  - 템플릿 upload를 render하기
	- Controller:postUpload
	  - 새로운 video Object를 만들기
	  - videos에 추가하기
	- Template
	  - 템플릿 base에 upload video 링크를 추가하기
	  - 템플릿 upload에 form 만들기
  
	* 절대경로 vs. 상대경로
	  - URL 맨앞에 "/" 여부에 따라 결과가 달라짐
	  - "/"가 맨앞에 있으면 현재 접속하고 있는 페이지와 상관없이 루트 페이지가 기준이다
	  - 만약 없다면 마지막 / 앞쪽을 유지한 뒤에 값을 URL로 한다
	* `req.body`로 form 정보 다루기
	  - `app.use(express.urlencoded({ extended: true }));`
	  - form 안 input의 값을 가져오려면 name 속성을 가져야 한다

# 6.0 MongoDB 설치하기
 - MongoDB: `document-based`(objectjson-like) DB
 - MongoDB 설치하기
   - 로컬PC: 사이트에 Server 다운로드 하기
   - GoormIDE: 처음 Setup에서 MongoDB 설치하기
 - MongoDB Shell 알아보기
   - GoormIDE의 경우, `Alt+T`로 터미널 2개를 켜고
   - 각각 `mongod`와 `mongo`를 입력하기
 - Mongoose: NodeJS로 MongoDB를 다루는 패키지
   - `npm i mongoose`
 - `db.js` 만들기
   - server와 mongoDB를 연결하는 파일
     - `touch src/db.js`
   - server.js
     - `import "./db";`
   - DB파일
     - import mongoose
	 - `mongoose.connect("mongodb://127.0.0.1:27017/wetube");`
	 - `mongoose.connection`을 이용해 err와 connect에 대한 console.log 하기
	 - `mongoose.connection.on("error", (err) ...)
	 - `mongoose.connection.once("open", ...)`

  * MongoDB Shell Command
    - `show dbs`: DB 목록 보기
	- `use [DB명]`: 작업할 DB 정하기
	- `show collections`: DB 속 Model 목록 보기
	- `db.[model명].find()`: 해당 Model의 Instance 목록 보기
    - `db.[model명].remove({})`: Model의 Instances 지우기

# 6.9 MongoDB Model 만들기
  - models 폴더와 model 파일 만들기
    - `mkdir src/models`
	- `touch src/models/[첫대문자_파일명].js`
  - Model: 데이터의 형태를 규정하는 파일
  - Schema: Model의 모양과 자료형을 기술함
  - model 파일 만들기
    - model 파일명은 대문자로 시작함
	- import mongoose
    - `new mongoose.Schema({ ~ })`
	- 자료형은 `{ type: ~ }` 또는 `~`로 나타내기
	- 배열은 `[{자료형}]`로 나타내기
	- `mongoose.model("[model명]", [스키마]);
	- `export deafult [Model]`
	- `server.js`에서 import [Model파일];
  
  * Schema 속성
    - `type`
	- `required: true`
	- `default: ~`
  * Schema 자료형 및 자료형만의 속성
    - `String`
	  - uppercase / lowercase
	  - trim
	  - minLength / maxLength(HTML Form에도 반영하기)
	- `Number`
	- `Date`

# 6.11 서버로부터 `init.js` 분리하기
  - `touch src/init.js`
  - `init.js`는 프로젝트에 필요한 것들을 import하는 역할
  - `server.js`에서 `export default app;`하기
  - `init.js`에서 `db`, `model`, `server` import하기
  - nodemon 경로를 `server.js` >> `init.js`로 바꾸기

# 6.12 MongoDB Query 다루기
  - MongoDB Query: MongoDB에서 데이터 다루는 명령어
  - DB에서 데이터 불러오기
    - `[Model명].find(~)`
	- `[Model명].findById([id])`
  - `res`에 `return`을 하는 이유는 `res`은 한번만 호출되어야 하기 때문에 코드상으로 함수를 종료해야 하기 때문이다
  - DB Query를 사용할 때는 Javascript의 속도를 맞추기 위해 함수 앞에 `async`를, query앞에 `await`를 한다
  
  * Callback방식 vs. Promise방식
    - Callback: Callback 함수 안에서 render하여 DB에서 데이터를 받아온 후 렌더링하도록 제한하는 것
	- Promise: 함수명 앞에 async하고 DB Query 앞에 await하기
	  - await는 JavaScript가 외부 데이터 불러오기를 기다리는 것
	- Error를 잡으려면 `try ... catch`하기
	
# 6.15 Video 데이터 Create하기
  - model
    - 데이터에 대해 자세히 묘사하기
  - template
    - 입력이 필요한 값은 input을 만든다(name 포함)
  - controller
    - input한 값은 req.body에서 가져오기
	- 방법 1: object를 만들고 따로 save하기
	  - `new [Model명]({Schema에_구체적인_값_넣기});`
	  - `await [object].save();`
	- 방법 2: `[Model].create`하기
	  - `await [Model].create({~})`
    - Validation Error는 `try ... catch`로 잡기
  * TimeStamp: `Date.Now()`
  * hashtags값을 javascript로 변환하기
    - `hashtags.split(",").map(word => word.startsWith("#") ? word : #${word})`(backtick 포함하기)

# 6.20.1 Video 데이터 Read하기
  - id로 video가 exist한지 확인하기
    - `await [Model명].exists({ _id: id })`
  - Operator 사용해 exist 여부 확인하기
    - `await [Model명].exists({ $or: [{~}, {~}] })`
  - 해당 id의 비디오가 없을 때, 404 보내기

# 6.20.2 Video 데이터 Update하기
  - Controller
    - id로 video 데이터 불러오기
	- 해당 id의 video가 없을 때 404 보내기
	- video 데이터를 template에 render하기
    - 방법 1: input값마다 일일히 수정 후 save()하기
	  - `req.body`에서 input값 받아오기
	  - id로 video 데이터 가져오기
	  - `video.title = title`
	  - ...
	  - `await video.save();`
	- 방법 2: findByIdAndUpdate
	  - `[Model명].findByIdAndUpdate(id, {~})`
  - Template
    - input들을 video 데이터 값을 value로 가지기

# 6.23 MongoDB Middleware 알아보기
  - Middleware: Model을 저장하기 전에 Schema 내용을 변환하는 것
    - `[Schema명].pre("save", ~)`
	- Model로 저장되기 전 Object는 `this`로 활용할 수 있음
  - Static Fuction: Model을 통해 불러올 수 있는 사용자정의 함수
    - Static 함수 만들기
	  - `[Schema명].static("[함수명]", [함수])`
	- Static 함수 사용하기
	  - `[Model명].[Static함수명]([VARIABLE])`

# 6.25 Video 데이터 Delete하기
  - Template
    - watch 템플릿에서 delete 링크 만들기
  - Router
    - delete 링크에 대한 GET Request하기
  - Controller
    - url parameter에서 id 가져오기
	- `[Model명].findByIdAndDelete(id)`

# 6.26 Video 데이터 Search하기
  - Video 데이터 목록 내림차순으로 바꾸기
    - `find({}).sort({ createdAt: desc })`
  - Template
    - search 페이지 만들기
	  - form(method="GET")
	  - search input(name="keyword")
	  - submit
  - Router
    - Global Router에서 search 라우트 추가하기
  - Controller
    - `query`에서 keyword 받기
	- query가 없으면 query값은 `undefined`이다
  - 검색 조건 다양하게 구현하기(MongoDB RegEx`p)
    - `{$regex: new RegExp(keyword, "i")}`
	- `i`: ignore-case(대소문자 구별x)
	- `^[KEYWORD]`: 키워드로 시작하는 단어
	- `[KEYWORD]$`: 키워드로 끝나는 단어

# 7.0 User 데이터 Join하기
  - User 모델 만들기
    - Mongoose Model 구조 만들기
	  - import mongoose
	  - userSchema 만들기
	  - User 모델 만들기
	  - 모델 export default하기
    - `email` / `username` / `password` / `name` / `location`
    - `init.js`에 import하기
  - Router > Controller > Template
    - getJoin은 Join 템플릿을 render하기
    - postJoin은 Form에 입력한 데이터를 db에 create하기
	  - `res.redirect("/login")`
	- Join 템플릿은 생성할 계정 object를 post하면 된다
  - Password를 Hashing하기
    - DB에 raw한 password를 저장하면 해킹에 취약하다
	- 따라서, 일방향 함수인 hash를 통해 암호화한다
	- `npm i bcrypt`
	- `bcrypt.hash([PlainText], [saltRounds], [callbackFunction])`
	- `pre`함수로 Object가 저장되기 전 `hash`해준다.(`async-await`하기)
  - Form Validation하기
    - 데이터가 DB에 저장되기 전 값이 유효한지 확인하는 절차
	- Unique한 값 중복여부 확인하기
	  - `await [Model명].exists({ ~ });`
	  - `if ([EXISTS?]) { return res.render~ };`
	  - `[Model명].create` 하기 전에 render하기
	- Password 일치여부 확인하기
	  - `if (password===password1) {~}`

# 7.4 Status Code 알아보기
  - render할 때 status code를 부여하면 현재 접속에 대한 정보를 줄 수 있다.
  - `res.status(400).~`
  
  * Status Code 종류 알아보기
    - `200`: 성공
	- `400`: Client쪽 오류
	- `404`: 웹페이지 찾을 수 없음

# 7.5 Login 구현하기
  - Router > Controller > Template
    - getLogin은 Login 템플릿을 render하기
	- postLogin은 Username과 Password 유효한지 확인한다
	  - Form에 입력한 username인 user 찾기(`User.findOne({ ~ })`)
	  - Password는 bcrypt의 compare 기능으로 Form과 DB의 password를 비교한다
      - `await bcrypt.compare(password, user.password)`
	- Login 관련한 Error 처리하기
	  - `An account with this username does not exists.`
	  - `Wrong Passowrd.`
	- Join과 Login 페이지 오고가는 Link 만들기
	  - `Don't have an account?`
	  - `Already have an account?`

# 7.6 `middlewares.js` 분리하기
  - `touch src/middlewares.js`
  - `middleware.js`는 `server.js` 내 middleware을 간결히 하기 위한 역할
  - middleware를 export하고 server에 import하기
  - import한 middleware는 router 전에 `app.use`하기

# 7.7 Sessions와 Cookies 알아보기
  - Sessions: Backend와 Browser간에 활동을 기억하는 것
  - Cookies: Backend가 Browser에게 주는 정보를 전달하는 수단
    - Browser는 Cookie를 자동적으로 request와 함께 첨부한다
	- Session의 id는 Cookie에 저장된다
  - HTTP 접속은 Backend가 HTML을 render하면 종료가 된다(=stateless)
  - Express-Session 작동원리 이해하기
    - Express-Session은 browser의 request를 받을 때마다 server의 메모리에 session을 생성한다
    - Browser가 Website를 방문할 때마다 Browser만의 SessionID를 만들어 browser에게 보내준다
    - Browser는 Cookie에 SessionID를 웹사이트를 방문할 때마다 request와 함께 보낸다
	- session은 `req.session`에서 확인하며 이는 browser마다 다르다
    - `req.session`에 user의 정보를 넣을 수 있다
  - Chrome 브라우저에서 `[Appliation]-[Storage]-[Cookies]`에서 Cookie를 확인할 수 있다.

  * Cookies Properties
    - secret: Backend가 만든 session임을 증명하는 sign하기
	- domain: cookie의 소속을 정하기(다른 domain 사용x)
	- expires: 만료날짜. `session`은 무기한이다
	- maxAge: 유효기간. 단위는 miliSecond
  * Session Store: Session 저장소
    - Cookie에는 session의 id만 저장되며 session에 대한 정보는 Server쪽으로 저장된다
    - 메모리에 기반한 Session Store는 서버 재시작과 함께 초기화된다
	- Production 단계에는 DB에 Session 정보를 저장해야 한다

# 7.11 `express-session` 사용해 Login 구현하기
  - `npm i express-session`
  - `express-session`으로 `session` 만들기
    - `server.js`에 import하기
	- Router 이전에 `session` `app.use`하기
	- session에 `secret`을 부여하고, `resave`와 `saveUnitialized`을 모두 `true`한다
	  - `resave`는 변경사항이 없어도 기존 session을 다시 저장할지 여부
	  - `saveUnitialized`는 세션이 수정되지 않아도 session을 저장할지 여부
	  - 일반적으로 `resave`와 `saveUnitialized`는 모두 `false`처리한다
	  - `cookie` 속성은 `cookie: {~}`을 추가하여 수정할 수 있다
    - `req.session`이 생성된다
  - postLogin에서 `session`에 `login 정보` 추가하기
	- `req.session.loggedIn = true;`
	- `req.session.user = user;`
  - `req.session` 정보를 `res.locals`로 넘기기(middleware)
	- `res.locals.loggedIn = Boolean(req.session.loggedIn);`
	- `res.locals.loggedInUser = req.session.user;`
  - Pug Template에게 Session 정보 보내기(`res.locals`)
    - Pug Template은 `res.locals`를 읽을 수 있다
	- `res.locals.[개체명] = [값];`
	- Middleware로 설정하면 전역변수(Global Variable)로도 설정 가능하다
	- Pug에서는 `[개체명]`으로 사용가능하다

# 7.12 MongoStore로 Session을 DB에 저장하기
  - `npm i connect-mongo`
  - MongoStore를 import하기
  - session에 MongoStore.create하고 mongoUrl 추가하기
    - `store: MongoStore.create({mongoUrl: "mongodb://127.0.0.1:27017/wetube"})`

# 7.14 환경변수(Environment Variable)로 주요내용 숨기기
  - `.env` 만들기
  - `.gitignore`에 `.env` 추가하기
  - `.env` 내 환경변수는 대문자로
  - `npm i dotenv`
  - `require("dotenv").config();`
  - `process.env.[환경변수명]`으로 사용하기

# 5.6 CSS
  - MVP.css (임시 css)
    - `link(rel="stylesheet" href="https://unpkg.com/mvp.css")`
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
	  - findByIdAndUpdate는 default로 update 이전의 데이터를 return한다
	  - `(id, {~}, { new: true })`하면 업데이트된 이후의 값을 return한다
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
	- `res.locals.loggedInUser = req.session.user || {};`
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
    - `touch .env`
    - `.gitignore`에 `.env` 추가하기
    - `.env` 내 환경변수는 대문자로
  - `.env`에서 환경변수 읽어오기
    - `npm i dotenv`
    - `import "dotenv/config";`
  - `process.env.[환경변수명]`으로 사용하기
  - `.env`에 값을 저장하는 이유
    - 유저로부터 값을 숨기기 위해
	- 전역변수로 사용하기 위해

# 7.16 OAuth로 GitHub 계정 정보 가져오기
  - github OAuth App 만들기
    - [Settings] - [Developer settings] - [OAuth Apps]
	  - `OAuth Apps` 만들기
	  - `client_id` / `authorization callback URL` / `client_secret` 가져오기
  - OAuth로 User가 GitHub 로그인하는 과정 알아보기
    1. GitHub로 User를 redirect하기
	2. GitHub는 token과 함께 우리 site로 돌려보냄
	3. token을 가지고 API에 접속하기
  - GitHub Authorize 링크 살펴보기
    - `https://github.com/login/oauth/authorize`
	- `?[parameter명]=[값]& ...`
	- URL에 parameter(`?`) 추가하기
	  - `client_id`: OAuth_App과 연결하기
	  - `scope`: User 유저 정보에 대해 얼마나 요청할건가
	  - `allow_signup`: GitHub 계정 여부에 따라 계정 생성할지 묻기
	- 여러 `scope` 속성을 요청할 때는 띄어쓰기로 구분한다
	  - `read:user`: User에 대한 모든 정보
	  - `user:email`: User의 Email만 요청
  - GitHub로 User를 redirect하기
    - Template에 직접 긴 url을 입력하기보다 route를 만드는 것이 관리하기 수월하다
	- Template / Router / Controller
	  - Login 템플릿에 `/users/github/auth` 링크 만들기
	  - User 라우터에 `/github/auth` 추가하기
	  - Controller는 조합한 url을 redirect하기
	- URL 조합하기
	  - baseUrl: `https://github.com/login/oauth/authorize`
	  - config: Object 형태로 parameter 설정하기
	  - `client_id` / `scope` / `allow_signup`
	  - `client_id` 값은 `.env`에 저장하기
	  - `new URLSearchParams(config).toString()`
	- `baseUrl`과 `params` 조합해 redirect하기
  - code에서 얻은 access_token로 user정보를 api에서 받아오기
    - code: GitHub Auth가 끝나고 URL query에 주어지는 정보
	- Router / Controller
	  - `/users/github/callback` 라우트 만들기
	  - Controller는 조합한 url에서 User 정보 가져오기
	- access_token 받아올 URL 조합하기
	  - baseUrl: `https://github.com/login/oauth/access_token`
	  - config: Object 형태로 parameter 설정하기
	  - `client_id` / `client_secret` / `code`
	  - `client_id`와 `client_secret` 값은 `.env`에 저장하기
	  - `code`는 `req.query.code`로 받아오기
	- Node-Fetch 설치하기
	  - fetch는 browser만 가능하며 nodeJS에서 사용하려면 package로 받아야 한다
	  - `npm install node-fetch@2.6.1`
	  - `import fetch from "node-fetch";`
	- 데이터를 Fetch하고 json 형식으로 표현하기
	  - `await fetch([URL], {[CONFIG]})`
	  - `await([FETCH한_데이터]).json();
	- code로부터 access_token fetch하기
	  - `method: "POST"`
	  - `headers: {Accept: "application/json"}`
	- access_token을 가지고 api에서 user 정보 fetch하기
	  - access_token 존재여부 확인하기
	  - `if("access_token" in ~)`
	  - 없다면 `/login`으로 redirect하기
	  - URL: `https://api.github.com/user`
	  - `headers: {Authorization: token ${access_token}}`
	  - userData에 담아 차후에 사용하기
    - access_token을 가지고 api에서 email 정보 fetch하기
	  - user 정보 fetch 과정과 유사하다
	  - URL: `https://api.github.com/user/email`
	  - `headers: {Authorization: token ${access_token}}`
	  - 유효한 github email은 primary와 verified가 true이다
	  - `emailData.find((email) => email.primary === true && email.verified === true)
	  - 만약 유효한 email이 없다면 `/login`으로 redirect하기

# 7.21 GitHub 로그인하기
  - github의 유효한 이메일로 로그인하기
	- DB에 해당 email로 계정을 만들었는지 확인하기
	  - `let user = await User.findOne({ email: [유효한_email] });`
	- 만약 해당 email을 가진 계정이 없다면(github계정내용으로 user 만들기)
	  - DB에 `User.create`하여 user 변수에 덮어쓰기
	  - userData를 활용해 data 채우기
	  - password는 ""
	  - githubOnlyLogin을 true로 한다
	- session 만들어 login 완료하기
	  - `req.session.loggedIn = true;`
	  - `req.session.user = user;`
  - Social로그인 계정은 Login Form 사용 못하게 하기
    - User Schema의 password required >> `false`
	- postLogin Controller: User.findOne + `githubLoginOnly` : `false`

# 7.22 Logout 구현하기
  - ROUTER > CONTROLLER
  - Session 종료하기
    - `req.session.destroy();`
  - Home으로 redirect하기

# 8.0 User 데이터 Edit하기
  - Router > Controller > Template
    - Router: getEdit / postEdit
	- getEdit: `edit-profile` 템플릿을 render하기
	- `edit-profile` Template에서 form 만들기(password 변경은 8.2 참고)
	- input의 value는 `res.locals.loggedInUser`에서 가져오기
  - DB User 데이터 update하기
    - `User.findByIdAndUpdate`
	  - `req.session`의 user에서 _id 받아오기
	  - `{ new: true }` 추가하여 edit한 user 정보 const에 받아오기
	- session 업데이트하기
	  - `req.session.user = [update된 user 정보]`
  - Input 값 validation하기
    - email와 username은 unique한 값이므로 session 값과 비교한다
	  - `sessionsEmail !== email(form)`
	  - `sessionUsername !== username(form)`
	- 만약 session 값과 form 값이 다르다면 edit한 것으로 간주한다
	- 이 경우 중복값이 있는 계정(duplicate_key)이 있는지 확인한다
	  - 빈 Array인 searchParam을 만들어 edit했을 때 push한다
	  - 만약 searchParam의 값이 있다면,
	  - `User.findOne({ $or: searchParam })`
	  - if (foundUser && foundUser._id.toString() !== _id)

# 8.1 Middleware를 이용해 Login여부에 따른 접속 통제하기
  - `req.session.loggedIn` 여부에 따른 middlware 만들기
    - `protectorMiddleware`, `publicOnlyMiddleware`
  - Router에 middleware을 추가하여 접속 통제하기
    - middleware를 import하기
	- `protectorMiddleware`
	  - User: logout / edit
	  - Video: upload / edit / delete
	- `publicOnlyMiddleware`: Login
  - Route에 middlware 추가하는 방법
    - `[Router명].get([URL], [MIDDLEWARE], [CONT]);`
	- `[Router명].route([URL]).all([MIDDLEWARE]).get(~).post(~)`

# 8.2 User의 password 변경하기
  - Controller > Router > Template
    - password 있는 계정(github계정x)만 접속하기
	  - session 내 user의 `githubLoginOnly` 여부 확인하여 redirect하기
	- 계정 password 아는지 확인하기(oldpassword)
	  - `form_oldpassword`: `req.body`
	  - `session_password`: `req.session.user.password`
	  - `bcrypt.compare([form_oldpassword], [session_password])`
	  - 만약 `form_oldpassword`와 `session_password`가 일치하지 않다면, 에러 띄우기
	- 새로운 password와 confirmation 비교하기 
	- 새로운 password를 update하기
	  - _id로 user를 찾아 password만 교체하고 `user.save()`하기
	  - `user.save()`하면 pre save도 작동해 password가 hasing된다
	  - session 비밀번호도 교체하기
    - 성공적으로 update하면 logout한다(redirect하기)
	
# 8.4.1 Views 폴더 세분화하기
  - `views/` 폴더 관리하기
    - template이 많아지면서 분류해서 관리할 필요가 생긴다
	- controller명을 폴더명으로 한다
  - Controller를 render하기
    - `views` 폴더가 기준이므로 render하는 경로를 `[폴더명]/[template명]`으로 한다.
  - Template에서 `base`를 extends하기
    - 폴더 내 template이라면 base파일이 폴더 밖에 있으므로, `extends ../base`하기

# 8.6 Image File을 Upload하기
  - Multer
    - form을 통해 file을 upload 가능하게 해주는 package
    - `npm i multer`
	- multer로 form 데이터를 다루기
	  - <form enctype="multipart/form-data">
	- multer가 file을 다루는 folder 설정하기
	  - `middleware.js`에서 multer를 import하기
	  - `multer({ dest: "uploads/[dataType]", limits: { fileSize: [max_byte] }});`	  
	- post controller 실행하기 전에 form에서 file 가져오기
	  - `.post([Middleware명].single("[form의 name]"), [post_controller])`
	  - `multer` middleware를 먼저 실행하고, `post controller`를 나중에 한다
	  - `req.file`에서 file을 사용할 수 있다
  - File은 웹하드에 저장하며, DB에는 File의 Path만 저장한다.
  - Template
    - Image파일을 upload하는 form 만들기
      - `label`과 `input(type="file")`을 각각 for와 id로 연결하기
	  - accept="image/*"하면 image파일을 불러올 수 있다
	- avatarUrl로 <img> 구현하기
	  - `img(src="/" + loggedInIUser.avatarUrl ~)`
  - User의 avatarUrl를 Update하기
    - form에서 image를 upload한 경우,
	  - `const { file } = req;`
	  - `avatarUrl: file.path`
	- form에서 image를 upload하지 않은 경우,
	  - `const { avatarUrl } = req.session.user;`
	  - `avatarUrl: avatarUrl`
	- `avatarUrl: file ? file.path : avatarUrl`
  - browser가 uploads 폴더를 조회하도록 허용하기
    - server.js
	  - `app.use("[Route명]", express.static("[폴더명]"))`

# 8.9 Data별로 나눠 upload하기
  - User
    - Middleware
	  - `multer({ dest: "uploads/videos/", limit: { fileSize: ~ }})`
	- Router
	  - import avatarUpload
	  - `.post(avatarUpload.single("avatar"), postEdit);`
  - Video
    - Template: Upload Video
	  - `form(enctype="multipart/form-data")`
	  - `label(for="video")`
	  - input(type="file", accept="video/*", name="video", id="video", required)
	- Template: Watch Video
	  - `video(src="/" + video.fileUrl, controls)`
	- Middleware
	  - `multer({ dest: "uploads/videos/", limit: { fileSize: ~ }})`
	- Router
	  - import videoUpload
	  - `.post(videoUpload.single("video"), postUpload);`
	- Model
	  - `fileUrl`
	- Controller
	  - `const { path: fileUrl } = req.file;`
	  - `Video.create({ fileUrl, ... })`

# 8.10 User Profile 구현하기
  - Template
    - touch `users/profile`
	- nav: href="/users/${loggedInUser._id}"
  - Router
    - `userRouter.get("/:id[0-9a-f]{24}, see)`
  - Controller
    - user가 없을 때 404 Error를 띄운다
	- id는 `req.params`에서, user는 DB에서 id로 가져오면 된다
	- user를 render할 때 변수로 넘긴다

# 8.11 Video의 owner 설정하기
  - Model
    - owner 추가하기
	- `type: mongoose.Schema.Types.ObjectId`
	- `ref: "[참고하는_Model명]"`
  - render할 때 owner 표시하기
    - controller: watch
	  - User Model을 import하기
	  - `video.owner`를 id로 한 User를 찾기
	  - `owner`를 render 변수로 넘기기
	- controller: postUpload
	  - req.session.user에서 _id 받아오기
	  - Video.create할 때, `owner` 값을 _id로 하기
  - Video Owner만 Edit, Delete Video 제한하기
    - Template
	  - if String(video.owner) === String(loggedInUser._id)

# 9.0 Webpack 사용해 FrontEnd 요소로 변환하기
  - .js, .scss나 image파일을 변형, 압축하여 browser가 이해할 수 있는(compatiable) 형태로 만들어주는 패키지
  - webpack는 주로 툴에 포함되어 있어 직접 다루지 않는다
  - Webpack 설치하기
    - `npm i webpack webpack-cli -D`
  - Webpack은 구버전 Javascript를 사용하므로 유의한다
    - `import`: `const xx = required(~)`
    - `export const`: `module.exports = {~}`
  - `src/client`파일을 webpack으로 변환하여 `assets`폴더에 저장하여 FrontEnd에 표현한다
    - assets 폴더를 express 서버가 접근할 수 있도록 설정한다
      - `app.use("/assets", express.static("assets"));`
	- `main.js`를 frontEnd에 적용하기
	  - <script src="/static/js/main.js">
	- `/assets`를 .gitignore에 추가하기
  - webpack 구동하기
    - `webpack.config.js` 만들기
	- `assets` script를 package.json에 만들기
	  - `"assets": "webpack --config webpack.config.js"`
	- console에 `npm run assets`하기
  - `webpack.config.js` 구조 살펴보기
    - `entry`: 변환할 파일
    - `output`: 변환한 결과물
      - filename
	  - path: path.resolve(__dirname, "assets", "js")
	  - path를 import하기(`const path = require("path");`)
    - `mode`: 결과물이 "development"인지 "production"인지 설정하기
    - `module`
      - `rules`: 어떤 파일을 어떤 변환을 할지 정한다
	  - rules는 Array이며, [{},{}, ...]

# 9.2 Webpack JS 변환하기
  - `npm i babel-loader -D`
    - 요구사항: `@babel/core @babel/preset-env webpack`
  - babel-loader `module` 만들기
    - `test: /\.js$/`
	  - test는 변환할 file의 extension을 말한다
	- `use: { [LOADER], [OPTIONS] }`
	  - [LOADER]: `loader: 'babel-loader'`
	  - [OPTION]: `options: { presets: [['@babel/preset-env', { targets: "defaults "}]]}`

# 9.4 Webpack SCSS 변환하기
  - 3가지 scss-loader 알아보기
    - 순서는 `SASS Loader` > `CSS Loader` > `Style Loader`
    - SASS Loader
	  - scss를 css로 변환하는 역할
      - `npm i -D sass sass-loader`
	- CSS Loader
	  - @import와 url()을 풀어서 해석하는 역할
	  - `npm i -D css-loader`
    - Style Loader
	  - css를 DOM의 head에 주입하는 역할
	  - `npm i -D style-loader`
	- miniCssExtractPlugin
	  - `npm i -D mini-css-extract-plugin`
	  - `const MiniCssExtractPlugin = require("mini-css-extract-plugin");`
	  - `plugins: [new MiniCssExtractPlugin({filename: "css/styles.css})]`
  - 여러 loader를 순서대로 실행하기
    - `use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]`
	- 실행하는 loader의 역순으로 진행한다
  - css파일을 FrontEnd에 적용하기
    - `link(rel="stylesheet", href="/static/css/styles.css")`
  - assets 폴더에 js와 css 파일 폴더로 분리하기
    - js
	  - path: path.resolve(__dirname, "assets"
	  - filename: "js/main.js"
	- scss
	  - `new MiniCssExtractPlugin({ filename: "css/styles.css"})`
  - webpack 자동실행하기
    - `webpack.config.js`
	  - `watch: true`
	  - `output: { clean: true }`
  - server와 assets scripts 분리하기
    - `package.json`의 `scripts`
	  - `"dev:server": "nodemon"`
	  - `"dev:assets": "webpack"`
	  - `--config [FILE명]`은 생략할 수 있다
	- `nodemon.json` 분리하기
	  - `{ ~ }`
	  - `"ignore": ["webpack.config.js, "src/client/*", "src/assets/*"]`
	  - `"exec": "babel-node src/init/js`

# 10.0 SCSS 작업전 준비할 사항 살펴보기
  - MVP.css
    - 본격적으로 css작업하기 이전에 적용할만한 임시 css
    - `link(rel="stylesheet" href="https://unpkg.com/mvp.css")`
  - `scss/styles.scss`
    - static으로 실제로 변환되는 파일
	- `@import`하여 css를 파일로 나누어 관리한다
	- 어느 Template 파일이건 공통적으로 적용되는 css는 여기에 적는다
  - `config`
    - _variables.scss
	  - `$[VAR명]: [값];`
	- _reset.scss
	  - [Link](https://meyerweb.com/eric/tools/css/reset)
  - fontawesome
    - 텍스트 아이콘을 제공하는 사이트
    - `link(rel="stylesheet", href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css")`
  - pug파일을 만들때마다 해당하는 scss파일을 만든다

  * 자주 사용하는 fontawesome 아이콘
    - youtube마크: i.fab.fa-youtube
	
# 10.1 SCSS 작업 팁
  - header(component)
    - Pug Template: partials로 분리하기
  - HTML요소 옆에 text 두기
    - `|   `
  - double populate
    - `populate({ path: ~, model: ~, populate: {~}})`
	
# 11.0 static화되는 js파일 여러개 처리하기
  - `webpack`
    - entry는 `{ main: ~, videoPlayer: ~}`처럼 object 처리한다
	- filename는 `js/[name].js`하면 entry을 참고해 중복없이 static파일을 생성한다
  - `base.pug`
    - `block scripts`를 만들어준다
	- `watch.pug`와 같이 Video Player가 필요한 template에만 script를 import한다

# 11.10 Custom한 Video Player 구현하기
  0. Video와 Control 구조
     - div#videoContainer
	 - video
	   - `src="/" + video.fileUrl`
	 - div#videoControls
  1. Play / Pause 버튼
     - `button`
     - `"click"` 이벤트
	 - `if (video.paused)`
	 - `video.play()` / `video.pause()`
	 - `video.paused` 여부에 따라 `playBtn` 내용 바꾸기
	   - `Play` / `Pause`
  2. 음소거(Mute) 버튼
     - `button`
	 - `"click"` 이벤트
	 - `if (video.muted)`
	 - `video.muted = true / false`
	 - `video.muted` 여부에 따라 `muteBtn` 내용 바꾸기
	   - `Unmute` / `Mute`
	 - [volumeRange]: mute 버튼 누를 시, 실제 볼륨량 변화주기
	   - `volumeRange.value`
	   - `video.muted ? 0 : (변수에 값 저장)`
  3. Volume 슬라이더(volumeRange)
     - `input(type="range")`
	   - `min=0`, `max=1`
	   - `step=0.1`
	   - `value=0.5`(default)
	 - `"input"` 이벤트
	   - 슬라이더 변화를 실시간으로 event함
	   - `event.target.value`
	 - mute일 때, 슬라이더를 이동하면
	   - `video.muted`를 `false`하기
	   - `muteBtn` 값 바꾸기
	 - 슬라이더 값이 0이 되면, mute하기
	   - `if (Number(event.target.value) === 0)`
	   - `video.muted`를 `true`하기
	   - `muteBtn` 값 바꾸기
	 - 비디오 볼륨 실제로 바꾸기
	   - `video.volume`
	   - 비디오 볼륭 변수에 저장하기(Mute버튼)
  4. Timeline 슬라이더
     - `input(type="range")`
	   - `min=0`
	   - `max` 값은 `loadedmetadata`에서 `video.duration`으로 받아오기
	   - `step=1`
	   - `value=0`(default)
     - `timeline` 슬라이더로 동영상 조작하기
	   - `"input"` 이벤트
	   - `event.target.value`
	   - `video.currentTime`를 `value` 값으로 하기
  5. Video Timer 구현하기
     - video의 metadata 가져오기
	   - "loadedmetadata" 이벤트
	   - "loadedmetadata": video 관련된 세부정보
	 - 새로고침 시 metadata 불러오기 오류 고치기
	   - `if (video.readyState === 4)`
	   - loadedmetadata 함수 재호출하기
	 - video 전체 시간 구하기
	   - `video.duration`
	 - 시간 Formatting 하기
	   - `[S]`: `Math.floor(~)`
	   - `new Date([S] * 1000)`
	   - `.toISOString()`
	   - `.substring([START], [END])`
	 - 현재 video 진행시간 구하기
	   - `"timeupdate"` 이벤트
	   - `video.currentTime`
	   - `timeline` 슬라이더에 value 반영하기
  6. Video Controls 뜨게 숨기게 하기
     - `"mousemove"` / `"mouseleave"` 이벤트
	 - class `"showing"`으로 controls 보이는지 여부 결정하기
	   - `videoControls.classList`
	   - `.add("showing");`
	   - `.remove("showing");`
	 - Timeout을 이용해 "mouseleave"해도 Controls을 3초간 지속하기
	   - `setTimeout(() => [REMOVE_CLASS], 3 * 1000)`
	   - 위 함수가 return하는 id값을 function 밖 변수에 저장하기(평소에는 null)
	   - 만약 "mousemove"할 때, `if ([변수])`로 timeout을 확인한다
	   - timeout이 확인되면 `clearTimeout([변수])`하고 다시 null값 주기
	 - 마우스를 video 위에서 움직이지 않을 때 Controls 몇초뒤 가리기
	   - "mousemove" 이벤트
	   - 마우스가 이동할때마다 if문으로 class를 지우고,
	   - 바로 Timeout을 진행한다(Timeout의 id는 변수에 저장하기)
  7. 전체화면 만들기
     - fullscreen 여부 확인하기
	   - `document.fullscreenElement`
     - 평소에는 `null`, 전체화면이면 전체화면중인 Element이 값으로 뜬다
     - 만약 fullscreen이 null이 아니라면,
       - 전체화면 나가기: `document.exitFullscreen`
       - 전체화면하기: `[전체화면Element].requestFullscreen()`
     - 전체화면Element는 #videoContainer으로 한다.(video와 controls 포함시키기 위해서)
     - 버튼 값 알맞게 바꾸기

# 12.2 내부 API로 조회수 올리기
  - `apiRouter` 만들기
    - `/api`
	- render하지 않으므로 post만 한다
	  - `/videos/:id([0-9a-f]{24}/view)`
  - Frontend에서 video 데이터 받아오기
    - `data-attribute`: `data-`로 시작하는 HTML 태그속성
	- data-id=video._id
	- `[DIV].dataset`으로 `data-attribute`를 object로 받아올 수 있음.
  - video가 끝날 때 api 부르기
    - `"ended"` 이벤트
	- `[DIV].dataset`에서 id 받아오기
	- `fetch(`/api/videos/${id}/view`)`하되 method는 POST로
  - 조회수 올리기
    - `req.params`에서 id 가져오기
	- 해당 id의 video가 있는지 확인하기
	  - `Video.findById`
	  - 만약 video가 없다면 `sendStatus(404)` 보내기
	- DB에서 불러온 video의 `meta.view`를 `+1`하기
	- `video.save()`하고 `sendStatus(200)`하기
	
# 13.0 Video Recorder 구현하기
  - assets에 `recorder.js` 추가하기
    - `/src/client/js/recorder.js`
    - webpack
	  - `entry`에 추가하기
	  - `static`에 recorder.js 추가된다
  - scripts 정리하기
    - `main.js`는 base파일에
	- `recorder.js`는 `upload` 템플릿에
  - record 버튼 만들기
    - button#startBtn
	- stream 저장하기
	  - stream 외부 변수로 저장하기
	  - async / await
	  - navigator.mediaDevices.getUserMedia({ ~ });
	  - { ~ }: audio: true, video: true
	- regeneratorRuntime으로 stream 받아오기
  	  - `npm i rengerator-runtime`
	  - `main.js`에 import하기	
  - Record 버튼 on/off 표현하기
    - addEventListener / removeEventListener하기
	- Stop의 경우, recorder.stop()하기
  - recorder로 녹화하기
    - recorder, videoFile 외부 변수로 저장하기
	- recorder: new window.MediaRecorder(stream, { mimeType: "video/webm" })
	- `recorder.ondataavailable`: record가 끝나면 발생하는 이벤트
	  - videoFile은 `URL.createObjectURL(event.data)`를 받아오기
	  - video.scrObject = null(preview 지우기)
	  - video.src = videoFile(브라우저 메모리 링크 만들기)
	  - video.loop / video.play()
	- recorder.start()
  - recorder로 녹화한 파일 저장하기
    - document.createElement("a")
	- a.href = videoFile
	- a.download = "[File명]"
	- document.body.appendChild(a)
	- a.click()
	
# 15.0 Flash Message 구현하기
  - Flash Message
    - session에 저장되는 메세지
	- 한번 이상 호출되면 cache에서 사라짐
  - `npm i express-flash`
  - `server.js`
    - import `express-flash`
	- `app.use(flash());`
  - `req.flash`
    - `req.flash("[TYPE]", " ~ ")`
  - `res.locals`
    - `messages.[TYPE]`
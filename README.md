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


# 5.6 CSS
  - MVP.css (임시 css)
    - `link(rel="stylesheet" href="https://unpkg.com/mvp.css")`
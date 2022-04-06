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
  - Router 계획하기
    - 프로젝트에 어떤 종류의 데이터가 주가 될지(Domain) 생각하기
	  - Wetube = Video + User
	- 데이터를 다룰 때 어떤 기능이 필요한지 생각하기(CRUD)
	  - User: join / login / logout / edit-profile / delete-profile
	  - Video: upload / search / watch / edit / delete
    - 무슨 그룹으로 묶을지 생각하고 각각을 Router로 정한다
	  - Global Router: `/`(루트 URL)을 기준으로 하는 URL의 집합
	  - User Router
	  - Video Router
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
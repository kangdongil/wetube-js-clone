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
  - Import
    - 구JS 코드: `const [변수명] = require("[패키지명]");`
	- `import [변수명] = "[패키지명]";`
	
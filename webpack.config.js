// import
const path = require('path') // node 모듈을 import 해오는 기본방법 
const HtmlPlugin = require('html-webpack-plugin') // webpack plugin 모듈 가져오기 
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// export
module.exports = {
  resolve: { // 파일 링크 걸을때, js 또는 vue 확장자 기입하지 않아도 되도록 하는 속성
    extensions: ['.js', '.vue'],
    alias: { // 경로 별칭 설정 ==> 경로를 별칭으로 지정하여 사용. 
      '~': path.resolve(__dirname, 'src'),
      'assets':path.resolve(__dirname, 'src/assets')
    }
  },
  // 파일을 읽어들이기 시작하는 진입점 설정 
  entry: './src/main.js',

  //결과물(번들)을 반환하는 설정 
  output: {
    // path: path.resolve(__dirname, 'dist'), // 결과물의 반환지점을 설정 
    // filename: 'main.js',
    // 위에 path와 filename 을 주석처리 한 이유는, default로 설정되어 있기 때문
    // path는 dist로 filename은 위에 entry에 설정한 파일이름 그대로 따라감
    // npm run build 입력하면 dist 폴더와 내부파일(결과물)이 생성됨   

    clean: true // 덮어쓰기 기능 속성 
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/, 
        // .scss 또는.css 확장자를 갖는 파일을 찾는 정규표현식
        // 물음표를 붙이면 있을수도 없을수도 있다는 뜻 ==> s가 있거나 없을 수도 있다. 
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: ['file-loader']
      }
    ] 
  },

  // 번들링 후 결과물의 처리방식 등 다양한 플러그인 사용을 위한 구성요소 추가 
  plugins: [ 
    new HtmlPlugin({ // 생성자를 이용한 플러그인 생성 
      template: './index.html' // 템플릿 연결 
    }),
    new CopyPlugin ({
      patterns: [
        { from: 'static' } // static 폴더 안의 내용이 dist로 복사되어 들어가도록 한다. 
      ]
    }),
    new VueLoaderPlugin()
  ],

  devServer: {
    host:'localhost'
  }
} 
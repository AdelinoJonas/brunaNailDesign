const multer  = require('multer')
const {randomBytes} = require("crypto")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploadFiles/')
  },
  filename: function (req, file, cb) {
      const extensaoArquivo = file.originalname.split('.')[file.originalname.split('.').length -1];

      // Cria um código randômico que será o nome do arquivo
      const novoNomeArquivo = randomBytes(64)
          .toString('hex');
      // Indica o novo nome do arquivo:
      cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
  }
});

function filter (req, file, cb) {
  const ext = file.originalname.split('.')[file.originalname.split('.').length -1];
  if(ext !== 'png' && ext !== 'jpg' && ext !== 'gif' && ext !== 'jpeg') {
      return cb(new Error('Apenas imagens são permitidas!'))
  }
  cb(null, true)
}

const upload = multer({ storage,fileFilter:filter })

module.exports={upload}
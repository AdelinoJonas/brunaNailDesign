const mongoose = require('mongoose');
const URI = '';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

mongoose
  .connect(URI)
  .then(() => console.log('DB is Up!'))
  .catch(() => console.log(err));

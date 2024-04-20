const  nodemailer =  require('nodemailer'); // khai báo sử dụng module nodemailer

module.exports.sendMail = (email, subject, html) => {
    var transporter =  nodemailer.createTransport({ // config mail server
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD_APP,
        }
    });
    var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        html: html
    }
    transporter.sendMail(mainOptions, function(err, info){
        if (err) {
            console.log(err);
            res.redirect('/');
        } else {
            console.log('Message sent: ' +  info.response);
            res.redirect('/');
        }
    });
}

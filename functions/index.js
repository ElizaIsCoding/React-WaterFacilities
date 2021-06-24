

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);


exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});


const createNotification = (notification) => {
  return (admin.firestore()
    .collection("notifications")
    .add(notification)
    .then(doc => console.log("notification added", doc))
  )
};

exports.projectCreated = functions.firestore.document("projects/{projectId}")
  .onCreate(doc => {

    const project = doc.data();
    const notification = {
      content: "Added a new project",
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
  });


exports.userJoined = functions.auth.user()
  .onCreate(user => {

    return admin.firestore().collection('users')
      .doc(user.uid).get().then((doc) => {
        const newUser = doc.data();
        const notification = {
          content: 'Joined',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
      })
  });




  // exports.timer = functions.firestore.document("projects/{projectId}")
  // .onCreate(()=> {
  //   const timer = 0;
  //   const [time, setTime ] = useState({});
  //   const [seconds, setSeconds ] = useState(14400);
     
  //   const secondsToTime = (props) => {
  //     let hours = Math.floor(secs / (60 * 60));
  
  //     let divisor_for_minutes = secs % (60 * 60);
  //     let minutes = Math.floor(divisor_for_minutes / 60);
  
  //     let divisor_for_seconds = divisor_for_minutes % 60;
  //     let seconds = Math.ceil(divisor_for_seconds);
  
  //     let obj = {
  //       "h": hours,
  //       "m": minutes,
  //       "s": seconds
  //     };
  //     return obj;
  //   }
  
  //   useEffect(()=>{
  //     let timeLeftVar = secondsToTime(seconds);
  //     setTime({time: timeLeftVar})
  //   },[])
   
  
  //   const startTimer = (props) => {
  //     if (timer === 0 && seconds > 0) {
  //       timer = setInterval(countDown, 1000);
  //     }
  //   }
  
  //   const countDown = (props) => {
  //     let seconds = seconds - 1;
  //     setTime({
  //       time: secondsToTime(seconds)})
  //     setSeconds({
  //       seconds: seconds})  
  //     }
  
  //     return(
  //       startTimer()
        // <div>
        //   <button onClick={startTimer}>Start</button>
        //   h: {time.h} m: {time.m} s: {time.s}
        //   <button onClick={stopTimer}>Pause</button>
        // </div>
      );
    }
   
     
    )
  
    
  

  
    
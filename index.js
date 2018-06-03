'use strict';

const functions = require('firebase-functions'); // Cloud Functions for Firebase library
const DialogflowApp = require('actions-on-google').DialogflowApp; // Google Assistant helper library
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
  if (request.body.result) {
    processV1Request(request, response);
  } else {
    console.log('Invalid Request');
    return response.status(400).end('Invalid Webhook Request (expecting v1 or v2 webhook request)');
  }
});
/*
* Function to handle v1 webhook requests from Dialogflow
*/
function processV1Request (request, response) {
  let action = request.body.result.action; // https://dialogflow.com/docs/actions-and-parameters
  let parameters = request.body.result.parameters; // https://dialogflow.com/docs/actions-and-parameters
  let inputContexts = request.body.result.contexts; // https://dialogflow.com/docs/contexts
  let requestSource = (request.body.originalRequest) ? request.body.originalRequest.source : undefined;
  const googleAssistantRequest = 'google'; // Constant to identify Google Assistant requests
  const app = new DialogflowApp({request: request, response: response});
  // Create handlers for Dialogflow actions as well as a 'default' handler
  const actionHandlers = {
    // The default welcome intent has been matched, welcome the user (https://dialogflow.com/docs/events#default_welcome_intent)
    'welcome': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
     app.ask(app.buildRichResponse()
      .addSimpleResponse({speech:'I am your Q I S Guide!,I can guide you to know about Q I S Educationa Institutions!',displayText:'I am your Q I S Guide!😊\n I can guide you to know about Q I S Educational Institutions!'})
      .addSimpleResponse({speech:'Which institution you want to know about?',displayText:'which institution you want to know about?🤔'})
      .addSuggestions(['QISCET','QISIT','QISP','QISH','QIS Degree & PG College','SNES']));
    },
    // The default fallback intent has been matched, try to recover (https://dialogflow.com/docs/intents#fallback_intents)
    'unknown': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      app.ask(app.buildRichResponse()
      .addSimpleResponse({speech:'I don\'t understand!',displayText:'I don\'t understand!😟'})
       .addSuggestions(['QISCET','QISIT','QISP','QISH','QIS Degree & PG College','SNES']));
    },
    'helping': () => {
        app.ask(app.buildRichResponse()
        .addSimpleResponse({speech:'I can guide you to know about Q I S Educationa Institutions!',displayText:'I can guide you to know about Q I S Educational Institutions!😊'})
        .addSimpleResponse({speech:'Which institution you want to know about?',displayText:'which institution you want to know about?🤔'})
        .addSuggestions(['QISCET', 'QISP','QISIT','QIS High School','QIS Public school','QIS Degree & PG College','SNES','QISE']));
    },
    'tell.fullform': () => {
     const QISIT = 'Q I S Institute of Technology';
        const QISCET='Q I S College of Engineering and Technology';
        const QISP = 'Q I S College of Pharmacy';
        const QISH = 'Q I S High School';
        const QISC = 'Q I S Public School';
        const QISDP = 'Q I S Degree & PG College';
        const SNES = 'Sri Nidamanuri Educational Society';
        const QIS='Q I S';
        const QISE='QISE';
        let Fform=app.getArgument('Ins');
        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
         if(Fform==QISCET)
          {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('Q I S College of Engineering & Technology!')
            .addSuggestions(['QISIT full form','QISP full form','QIS full form','SNES full form']));
          }
         else if(Fform==QISIT)
         {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('Q I S Institute of Technology!')
            .addSuggestions(['QISCET full form','QISP full form','QIS full form','SNES full form']));
         }
         else if(Fform==QISP)
         {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('Q I S College of Pharmacy! ')
            .addSuggestions(['QISIT full form','QISCET full form','QIS full form','SNES full form']));
         }
         else if(Fform==SNES)
         {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('Sri Nidamanuri Educational Society!')
            .addSuggestions(['QISIT full form','QISP full form','QIS full form','QISCET full form']));
         }
         else if(Fform==QIS)
         {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('Quality is strength!')
            .addSuggestions(['QISIT full form','QISP full form','QISCET form','SNES full form']));
         }
        }
        else {
            if(Fform==QISCET)
          {
            app.ask('Q I S College of Engineering & Technology!\n'+
            'Which abbreviation do you want to know? Either QISIT full form\n or QISP full form \n or QIS full form or SNES full form');
          }
         else if(Fform==QISIT)
         {
           app.ask('Q I S Institute of Technology!\n'+
            'Which abbreviation do you want to know? Either QISCET full form\n or QISP full form \n or QIS full form or SNES full form');
         }
         else if(Fform==QISP)
         {
            app.ask('Q I S College of Pharmacy!\n'+
            'Which abbreviation do you want to know? Either QISCET full form\n or QISIT full form \n or QIS full form or SNES full form');
         }
         else if(Fform==SNES)
         {
             app.ask('Sri Nidamanuri Educational Institutions!\n'+
            'Which abbreviation do you want to know? Either QISCET full form\n or QISIT full form \n or QIS full form or QISP full form');
         }
         else if(Fform==QIS)
         {
             app.ask('Quality is Strength!\n'+
            'Which abbreviation do you want to know? Either QISCET full form\n or QISIT full form \n or SNES full form or QISP full form');
         }
        }
    },
    'courses.offered': () => {
         const QISIT = 'Q I S Institute of Technology';
         const QISCET='Q I S College of Engineering and Technology';
         const QISP = 'Q I S College of Pharmacy';
         const QISDP = 'Q I S Degree & PG College';
         let con=app.getContextArgument('institution','Ins');
         let Ins=app.getArgument('Ins');
         let sit=con.value;
         if((Ins==QISCET)||(sit==QISCET))
          {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S College of Engineering and Technology Coureses Offered!')
            .addBasicCard(app.buildBasicCard('**Courses Offered**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Courses/QISCET_Courses.jpg','Courses')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QISCET Vision','QISCET Mission','QISCET Contact-us','QISCET code','QISCET Quick Brief']));
          }
         else if((Ins==QISIT)||(sit==QISIT))
         {
           app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S Institute of Technology Coureses Offered!')
            .addBasicCard(app.buildBasicCard('**Courses Offered**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Courses/QISIT_Courses.jpg','Courses')
            .setImageDisplay('CROPPED'))
            .addSuggestions(['QISIT Vision','QISIT Mission','QISIT Contact-us','QISIT code','QISIT Quick Brief']));
         }
         else if((Ins==QISP)||(sit==QISP))
         {
           app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S College of pharmacy Coureses Offered!')
            .addBasicCard(app.buildBasicCard('**Courses Offered**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Courses/QISP_Courses.jpg','Courses')
            .setImageDisplay('CROPPED'))
            .addSuggestions(['QISP Vision','QISP Mission','QISP Contact-us','QIS Pharmacy code','QISP Quick Brief']));
         }
         else if((Ins==QISDP)||(sit==QISDP))
         {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S Degree & PG College Coureses Offered!')
            .addBasicCard(app.buildBasicCard('**Courses Offered**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Courses/QISDP%20Courses.jpg','Courses')
            .setImageDisplay('WHITE'))
            .addSuggestions(['QIS Degree Vision','Qis Degree Mission','Qis Degree Contact-us','QISCET code','QIS Degree Quick Brief']));
         }
         
    },
    'tell.quickbrief': () =>  {
         const QISIT = 'Q I S Institute of Technology';
         const QISCET='Q I S College of Engineering and Technology';
         const QISP = 'Q I S College of Pharmacy';
         const QISH = 'Q I S High School';
         const QISC = 'Q I S Public School';
         const QISDP = 'Q I S Degree & PG College';
         const SNES = 'Sri Nidamanuri Educational Society';
         const QIS='Q I S';
         const QISE='QISE';
         let Ins=app.getArgument('Ins');
         if(Ins==QISCET)
          {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S College of Engineering and Technology Quick Brief!')
            .addBasicCard(app.buildBasicCard('**Quick Brief**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Quick%20Brief/QISCET.jpg','QISCETQuick Brief')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QISCET Vision','QISCET Mission','QISCET Contact-us','QISCET code','QISCET Courses']));
          }
         else if(Ins==QISIT)
         {
           app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S Institute of Technology Quick Brief!')
            .addBasicCard(app.buildBasicCard('**Quick Brief**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Quick%20Brief/QISIT.jpg','QISIT Quick Brief')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QISIT Vision','QISIT Mission','QISIT Contact-us','QISIT code','QISIT Courses']));
         }
         else if(Ins==QISP)
         {
           app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S College of pharmacy Quick Brief!')
            .addBasicCard(app.buildBasicCard('**Quick Brief**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Quick%20Brief/QISP.jpg','QISP Quick Brief')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QISP Vision','QISP Mission','QISP Contact-us','QIS Pharmacy code','QISP Courses']));
         }
         else if(Ins==QISDP)
         {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S Degree & PG College Quick Brief!')
            .addBasicCard(app.buildBasicCard('**Quick Brief**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Quick%20Brief/QISDP%20Quick%20Brief.jpg','QIS Degree & PG College Quick Brief')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QIS Degree Vision','QIS Degree Mission','QIS PG Contact-us','QISCET code','QIS Degree Courses']));
         }
          else if((Ins==QISH)||(Ins==QISC))
         {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S High School & Public School Quick Brief!')
            .addBasicCard(app.buildBasicCard('**Quick Brief**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Quick%20Brief/QISHP%20Quick%20Brief.jpg','QIS School Quick Brief')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QIS School Vision','QIS School Mission','QIS School Address','QISCET code']));
         }
          else if((Ins==QIS)||(Ins==QISE))
         {
            app.ask(app.buildRichResponse()
                  .addSimpleResponse('This is about Q I S Educational Institutions Quick Brief')
                  .addBrowseCarousel(app.buildBrowseCarousel()
                 // Add the items to the carousel
                  .addItems([
                  app.buildBrowseItem("QIS Quick Brief 😍","https://goo.gl/kTi9UM")
                  .setImage('https://goo.gl/kTi9UM', 'QIS Quick Brief'),
                  app.buildBrowseItem("QIS Quick Brief 😍","https://goo.gl/aebMgu")
                  .setImage('https://goo.gl/aebMgu', 'QIS Quick Brief'),
                  app.buildBrowseItem("QIS Quick Brief 😍","https://goo.gl/uDdZdi")
                  .setImage('https://goo.gl/uDdZdi', 'QIS Quick Brief')
                  ])
                 )
            .addSuggestions(['QISE Vision','QISE Mission','QISE Contact-us','QISCET code']));
         }
    },
    'contact.us': () => {
         const QISIT = 'Q I S Institute of Technology';
         const QISCET='Q I S College of Engineering and Technology';
         const QISP = 'Q I S College of Pharmacy';
         const QISH = 'Q I S High School';
         const QISC = 'Q I S Public School';
         const QISDP = 'Q I S Degree & PG College';
         const SNES = 'Sri Nidamanuri Educational Society';
         const QIS='Q I S';
         const QISE='QISE';
         let con=app.getContextArgument('institution','Ins');
         let Ins=app.getArgument('Ins');
         let sit=con.value;
         if(Ins==QISCET)
          {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S College of Engineering and Technology Contact Us Address!')
            .addBasicCard(app.buildBasicCard('**Contact Us**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Contact%20Us/QISCET%20Address2.jpg','QISCET Contact Us')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QISCET Vision','QISCET Mission','QISCET full form','QISCET code','QISCET Courses']));
          }
         else if((Ins==QISIT)||(sit==QISIT))
         {
           app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S Institute of Technology Contact Us Address!')
            .addBasicCard(app.buildBasicCard('**Contact Us**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Contact%20Us/QISIT%20Address.jpg','QISIT Contact Us')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QISIT Vision','QISIT Mission','QISIT full form','QISIT code','QISIT Courses']));
         }
         else if(Ins==QISP)
         {
           app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S College of pharmacy Contact Us Address!')
            .addBasicCard(app.buildBasicCard('**Contact Us**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Contact%20Us/QISP%20Address.jpg','QISP Contact Us')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QISP Vision','QISP Mission','QISP full form','QIS Pharmacy code','QISP Courses']));
         }
         else if(Ins==QISDP)
         {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S Degree & PG College Contact Us Address!')
            .addBasicCard(app.buildBasicCard('**Contact Us**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Contact%20Us/QISDP%20Address.jpg','QIS Degree & PG College Contact Us')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QIS Degree Vision','QIS Degree Mission','QIS Degree Courses','QIS degree & PG College','QIS Degree Quick Brief']));
         }
          else if((Ins==QISE)||(Ins==QIS))
         {
            app.ask(app.buildRichResponse()
            .addSimpleResponse('This is about Q I S College of Education contact US Address!')
            .addBasicCard(app.buildBasicCard('**Contact Us**')
            .setImage('https://storage.googleapis.com/qisguideappimages/Contact%20Us/QISCE%20Address.jpg','QIS School Quick Brief')
            .setImageDisplay('DEFAULT'))
            .addSuggestions(['QISE Vision','QISE Mission','Persons behind QISE','QISCET code','QIS Quick Brief']));
         }
          else if((Ins==QISH)||(Ins==QISC))
         {
            app.ask(app.buildRichResponse()
                  .addSimpleResponse('This is about Q I S High School & Public School Contact Us Address!')
                  .addBrowseCarousel(app.buildBrowseCarousel()
                 // Add the items to the carousel
                  .addItems([
                  app.buildBrowseItem("QIS Public School Contact Us Address 😍","https://goo.gl/3zYggH")
                  .setImage('https://goo.gl/3zYggH', 'QIS Public School Contact Us'),
                  app.buildBrowseItem("QIS High School Contact Us Address😍","https://goo.gl/Upjunx")
                  .setImage('https://goo.gl/Upjunx', 'QIS High School Contact Us Address') 
                  ])
                 )
            .addSuggestions(['QIS School Vision','QIS School Mission','QISCET code']));
         }
    },
    'ins.type': () => {
        const QISIT = 'Q I S Institute of Technology';
        const QISCET='Q I S College of Engineering and Technology';
        const QISP = 'Q I S College of Pharmacy';
        const QISH = 'Q I S High School';
        const QISC = 'Q I S Public School';
        const QISDP = 'Q I S Degree & PG College';
        const SNES = 'Sri Nidamanuri Educational Society';
        const QIS='Q I S';
        const QISE='QISE';
        let con=app.getContextArgument('institution','Ins');
        let Ins=app.getArgument('Ins');
        let sit=con.value;

         if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
           if ((Ins==QISCET)||(Ins==QISIT)||(Ins==QISP)||(Ins==QISH)||(Ins==QISC)||(Ins==QISDP)||(Ins==SNES)||(sit==QISCET)||(sit==QISIT)||(sit==QISP)||(sit==QISH)||(sit==QISC)||(sit==QISDP)||(sit==SNES)||(Ins==QIS)||(Ins==QISE)||(sit==QIS)||(sit==QISE)){
             if ((Ins==QISCET)||(sit==QISCET)) {
                 app.ask(app.buildRichResponse()
                 .addSimpleResponse('This is about Q I S College of Engineering & Technology!')
                 .addBasicCard(app.buildBasicCard('The QIS College of Engineering and Technology was established in the year 1998,'
                 +'  and sponsored by Sri Nidamanuri Educational Society to promote technological'
                 +' education to meet the requirements of a developing nation in the context of '+
                 'global concern at the threshold of the twenty first century.'+
                 ' A team of educated, enlightened, experienced technocrats with vision, firmly '+
                 'determined to promote high quality education is striving to provide every facility for '+
                 'achieving excellence. The college is one of the best colleges in and around the '+
                 'Prakasam Dist. The Standards of teaching are very high when compared with the '+
                 'other colleges. The college is affiliated to the Jawaharlal Nehru Technological University, Kakinada.')
                 .setTitle('About'))
                 .addSuggestions(['QISCET Vision','QISCET Mission','QISCET Courses Offered','QISCET Contact-us','QISCET code','QISCET Quick Brief']));
                }
             else if ((Ins==QISIT)||(sit==QISIT)) {
                 app.ask(app.buildRichResponse()
                 .addSimpleResponse('This is about Q I S Institute of Technology!')
                 .addBasicCard(app.buildBasicCard('The QIS Institute of Technology was established in the year 2008,'
                 +'  and sponsored by Sri Nidamanuri Educational Society, is committed to the promotion '
                 +'of technical education in Prakasam District. The College is approved by AICTE, New Delhi '+
                 'and affiliated to J.N.T. University, Kakinada and an ISO 9001:2008 certified institution'+
                 ' The College aims at developing a deep understanding of human values and social concerns among '+
                 ' the engineering students. Students are encouraged to get equipped and sensitized to '+
                 'understand full implications of their decisions, actions and even inactions.')
                 .setTitle('About'))
                 .addSuggestions(['QISIT Vision','QISIT Mission','QISIT Courses Offered','QISIT Contact-us','QISIT code','QISIT Quick Brief']));
                }
             else if((Ins==QISP)||(sit==QISP)) {
                   app.ask(app.buildRichResponse()
                  .addSimpleResponse('This is about Q I S College of Pharmacy!')
                  .addBasicCard(app.buildBasicCard('*QIS College of Pharmacy*, since its inception in'+
                  ' 2006, has been performing exceptionally well to meet its goal of providing '+
                  'quality pharmaceutical service to the society in view of the increasing need in the '+
                  'society for pharmacy education.')
                  .setTitle('About'))
                  .addSuggestions(['QISP Vision','QISP Mission','QISP Courses Offered','QISP Contact-us','QISP code','QISP Quick Brief']));
            }
            else if((Ins==QISH)||(Ins==QISC)||(sit==QISH)||(sit==QISC)) {
                 app.ask(app.buildRichResponse()
                 .addSimpleResponse('This is about Q I S Public and High School!')
                 .addBasicCard(app.buildBasicCard('OUR SCHOOL Making quality education a possible dream for every child, irrespective of caste and '+
                 ' community is the primary mission of QIS Public School and High School. Education being the noblest  '+
                 'practice in shaping up a child\'s future, the school deems to impart a strong sense of '+
                 'culture, values & deep understanding in them. It believes that these futuristic kids '+
                 'today can play a significant role in building the nation, tomorrow.')
                 .setTitle('About'))
                 .addSuggestions(['QIS School Vision','QIS School Mission','QIS High School Contact-us','QIS School Quick Brief']));
            }
            else if((Ins==QISDP)||(sit==QISDP)) {
                 app.ask(app.buildRichResponse()
                 .addSimpleResponse('This is about Q I S Degree & PG College!')
                 .addBasicCard(app.buildBasicCard('QIS DEGREE & PG COLLEGE is Affiliated to '+
                 'Acharya Nagarjuna University and Approved by National Council '+
                 'For Teacher Education (NCTE), Vengamukkalapalem, Ongole, M: 92464-19547')
                 .setTitle('About'))
                 .addSuggestions(['QIS Degree Vision','QIS Degree Mission','QIS Degree College Courses','QIS Degree Contact-us','QIS Degree Quick Brief'])); 
                }
            else if((Ins==SNES)||(sit==SNES)) {
                 app.ask(app.buildRichResponse()
                  .addSimpleResponse('This is about Sri Nidamanuri Educational Society')
                  .addBrowseCarousel(app.buildBrowseCarousel()
                 // Add the items to the carousel
                  .addItems([
                  app.buildBrowseItem("Sri Nidamanuri Educational Society 😍","https://goo.gl/fw7e4a")
                  .setImage('https://goo.gl/fw7e4a', 'Sri Nidamanuri Educational Society'),
                  app.buildBrowseItem("Golden Moments 😍","https://goo.gl/zD3apr")
                  .setImage('https://goo.gl/zD3apr', 'Golden Moments')
                  ])
                 )
                 .addSuggestions(['QISCET', 'QISP','QISIT','QIS High School','QIS Public school','QIS Degree & PG College']));
            }
             else if((Ins==QIS)||(Ins==QISE)||(sit==QIS)||(sit==QISE))
                {
            
                   app.askWithCarousel('Alright! Q I S or Q I S Educational Institution is a group of institutions!' +
                   ' About which institution you want to know?',
                  // Build a list
                  app.buildCarousel('Q I S Group of Institutions')
                 // Add the first item to the list
                 .addItems(app.buildOptionItem('QIS College of Engineering & Technology', ['QISCET', 'QIS College of Engineering and technology'])
                  .setTitle('QIS College of Engineering & Technology')
                  .setDescription('QIS College of Engineering & Technology is the one and only Autonomous' +
                  ' and \'A\' Graded Engineering College in Prakasam District of Andhra Pradesh...')
                  .setImage('https://storage.googleapis.com/qisguideappimages/Logos/QISCET%20Logo.jpg', 'QIS College of Engineering & Technology'))
                  // Add the second item to the list
                  .addItems(app.buildOptionItem('QIS Institute of Technology', ['QISIT'])
                  .setTitle('QIS Institution of Technology')
                  .setDescription('QIS Institute of technology is established in the year 2008 by' +
                  ' Sri Nidamanuri Educational Society...')
                 .setImage('https://storage.googleapis.com/qisguideappimages/Logos/QISIT%20Logo.jpg', 'QIS Institute of Technology'))
                 // Add third item to the list
                 .addItems(app.buildOptionItem('QIS College of Pharmacy', ['QISCP', 'QISP', 'QIS Pharmacy'])
                  .setTitle('QIS College of Pharmacy')
                 .setDescription('QIS College of pharmacy, since its inception in 2006, has been performing' +
                 ' exceptionally well to meet its goal of providing quality pharmaceuticsl service to...')
                 .setImage('https://storage.googleapis.com/qisguideappimages/Logos/QISP%20Logo.jpg', 'QIS College of Pharmacy'))
                 .addItems(app.buildOptionItem('QIS Degree & PG College', ['QIS Degree College', 'QIS PG College', 'QIS Degree and PG College'])
                 .setTitle('QIS Degree & PG College')
                 .setDescription('QIS DEGREE & PG COLLEGE is Affiliated to ' +
                  'Acharya Nagarjuna University and Approved by National Council ' +
                  'For Teacher Education (NCTE)...')
                 .setImage('https://storage.googleapis.com/qisguideappimages/Quick%20Brief/QISDP%20Quick%20Brief.jpg', 'QIS Degree & PG College'))
                 .addItems(app.buildOptionItem('QIS Public & High School', ['QIS High School', 'QIS Public School', 'QIS Public and High School'])
                 .setTitle('QIS Public & High School')
                  .setDescription('OUR SCHOOL Making quality education a possible dream for every child, irrespective of caste and ' +
                 ' community is the primary mission of QIS Public School and High School..')
                 .setImage('https://storage.googleapis.com/qisguideappimages/Quick%20Brief/QISHP%20Quick%20Brief.jpg', 'QIS Public & High School'))
                 .addItems(app.buildOptionItem('Sri Nidamanuri Educational Society', ['SNES'])
                 .setTitle('Sri Nidamanuri Educational Society')
                 .setDescription('Sri Nidamanuri Educational Society, a dedicated body to promote quality' +
                 ' education, is a team of educated, is a team of educated...')
                 .setImage('https://storage.googleapis.com/qisguideappimages/Logos/QISE_Logo.jpg', 'Sri Nidamanuri Educational Society'))
                  );
                }
          else{
                   app.ask(app.buildRichResponse()
                   .addSimpleResponse({speech:'About which institution you want to know?',displayText:'About which institution you want to know?🤔'})
                   .addSuggestions(
                  ['QISCET', 'QISP','QISIT','QIS High School','QIS Public school','QIS Degree & PG College','SNES','QISE']));
               }
            }
        }
        else{
                if ((Ins==QISCET)||(Ins==QISIT)||(Ins==QISP)||(Ins==QISH)||(Ins==QISC)||(Ins==QISDP)||(Ins==SNES)||(sit==QISCET)||(sit==QISIT)||(sit=QISP)||(sit==QISH)||(sit==QISC)||(sit==QISDP)||(sit==SNES)) {
                 if ((Ins==QISCET)||(sit==QISCET)) {
                 app.ask('This is about Q I S College of Engineering & Technology!'+
                 '\nThe QIS College of Engineering and Technology was established in the year 1998,'
                 +'  and\n sponsored by Sri Nidamanuri Educational Society to promote technological'
                 +' education\n to meet the requirements of a developing nation in the context of '+
                 'global concern at the threshold of the twenty first century!'+
                 '\nDo you want to know about Q I S College \nof Engineering & Technology\'s Vision or Mission\n ,or QISCET Counselling Code '+
                 'or QISCET Abbreviation?');
                 
                }
                 else if ((Ins==QISIT)||(sit==QISIT)) {
                 app.ask('This is about Q I S Institute of Technology!\n'
                 +'The QIS Institute of Technology was established in the year 2008,'
                 +'  and\n sponsored by Sri Nidamanuri Educational Society, is committed to the promotion '
                 +'of technical education in Prakasam District.'+
                 '\nDo you want to know about Q I S Institute of Technology\'s Vision or Mission or \nQISIT counselling code '+
                 'or QISIT Full form?');
                 
                }
             else if((Ins==QISP)||(sit==QISP)) {
                   app.ask('This is about Q I S College of Pharmacy!\n'
                  +'QIS College of Pharmacy, since its inception in'+
                  ' 2006,\n has been performing exceptionally well to meet its goal of providing '+
                  'quality pharmaceutical service\n to the society in view of the increasing need in the '+
                  'society for pharmacy education.'+
                  '\nDo you want to know about Q I S College of Pharmacy\'s Vision or Mission or\n'+
                 ' QISP code or QISP Full form?');
                  
               }
                else if((Ins==QISH)||(Ins==QISC)||(sit==QISH)||(sit==QISC)) {
                 app.ask('This is about Q I S Public and High School!\n'+
                 'OUR SCHOOL Making quality education a possible dream for every child, irrespective of caste and \n'+
                 ' community is the primary mission of QIS Public School and High School.\n Education being the noblest  '+
                 'practice in shaping up a child\'s future, the school deems to impart a strong sense of '+
                 'culture, values & deep understanding in them.'+
                 '\nDo you want to know about Q I S Public School & High School\'s Vision or Mission?');
                 
               }
                else if((Ins==QISDP)||(sit==QISDP)) {
                 app.ask('This is about Q I S Degree & PG College!\n'+
                 'QIS DEGREE & PG COLLEGE is Affiliated to '+
                 'Acharya Nagarjuna University and Approved by National Council '+
                 '\nFor Teacher Education (NCTE), Vengamukkalapalem, Ongole!'+
                 '\nDo you want to know about Q I S Degree & PG College\'s Vision or Mission or\n'+
                 'QIS Full form or SNES Full form');
                  
                }
                else if((Ins==SNES)||(sit==SNES)) {
                 app.ask('This is about Sri Nidamanuri Educational Society!\n'+
                 'Sri Nidamanuri Educational Society, a dedicated body to promote quality education, '+
                 '\nIt is a team of educated, experienced and enlightened academicians and technocrafts with vision!'+
                 '\nSNES sponsors Q I S College of Engineering & Technology, Q I S Institute of Technology, '+
                 'Q I S College of Pharmacy,\n Q I S Degree & PG College and Q I S Public & High School!'+
                 '\nAbout which institution do you want to know?');
                }
                else if((Ins==QIS)||(Ins==QISE)||(sit==QIS)||(sit==QISE)) {
                    app.ask('Q I S or Q I S Educational Institutions is a group of institutions!\n'+
                   'Those institutions are Q I S College of Engineering and Technology,\n'+
                   'Q I S Institute of Technology and Q I S College of Pharmacy and\n'+
                   'Q I S High School and Public School and Q I S Degree & PG College!\n'+
                   'Which institution you want to know about?');
               
                }
            }
        else {
              app.ask('I can guide you to know about Q I S Educational institutions!'+
              ' \nwhich one do you want to know about?'+
              ' \nQ I S College of Engineering & Technology'+
              ' or Q I S Institute of Technology or Q I S College of Pharmacy or\n Q I S Degree & '+
              'PG College or Q I S Public or High School?');
            }
        }
    },
    'item.selected': () => {
                const param = app.getSelectedOption();
                 if (!param) {
                      app.ask('You did not select any Institution from the list');
                    } 
                    else if (param === 'QIS College of Engineering & Technology') {
                             app.ask(app.buildRichResponse()
                             .addSimpleResponse('This is about Q I S College of Engineering & Technology!')
                             .addBasicCard(app.buildBasicCard('The QIS College of Engineering and Technology was established in the year 1998,' +
                             '  and sponsored by Sri Nidamanuri Educational Society to promote technological' +
                             ' education to meet the requirements of a developing nation in the context of ' +
                             'global concern at the threshold of the twenty first century.' +
                             ' A team of educated, enlightened, experienced technocrats with vision, firmly ' +
                             'determined to promote high quality education is striving to provide every facility for ' +
                             'achieving excellence. The college is one of the best colleges in and around the ' +
                             'Prakasam Dist. The Standards of teaching are very high when compared with the ' +
                             'other colleges. The college is affiliated to the Jawaharlal Nehru Technological University, Kakinada.')
                             .setTitle('About'))
                             .addSuggestions(['QISCET Vision', 'QISCET Mission', 'QISCET Contact-us','QISCET Counselling Code','QISCET Quick Brief']));
                    } else if (param === 'QIS Institute of Technology') {
                             app.ask(app.buildRichResponse()
                             .addSimpleResponse('This is about Q I S Institute of Technology!')
                             .addBasicCard(app.buildBasicCard('The QIS Institute of Technology was established in the year 2008,' +
                             '  and sponsored by Sri Nidamanuri Educational Society, is committed to the promotion ' +
                             'of technical education in Prakasam District. The College is approved by AICTE, New Delhi ' +
                             'and affiliated to J.N.T. University, Kakinada and an ISO 9001:2008 certified institution' +
                             ' The College aims at developing a deep understanding of human values and social concerns among ' +
                             ' the engineering students. Students are encouraged to get equipped and sensitized to ' +
                             'understand full implications of their decisions, actions and even inactions.')
                             .setTitle('About'))
                             .addSuggestions(['QISIT Vision', 'QISIT Mission', 'QISIT Contact-us', 'QISIT Counselling Code', 'QISIT Quick Brief']));
                   } else if (param === 'QIS College of Pharmacy') {
                             app.ask(app.buildRichResponse()
                             .addSimpleResponse('This is about Q I S College of Pharmacy!')
                             .addBasicCard(app.buildBasicCard('*QIS College of Pharmacy*, since its inception in' +
                             ' 2006, has been performing exceptionally well to meet its goal of providing ' +
                             'quality pharmaceutical service to the society in view of the increasing need in the ' +
                             'society for pharmacy education.')
                             .setTitle('About'))
                             .addSuggestions(['QISP Vision', 'QISP Mission', 'QISP Contact-us', 'QISP Counselling Code','QISP Quick Brief']));
                             
                    } else if (param === 'QIS Public & High School') {
                             app.ask(app.buildRichResponse()
                             .addSimpleResponse('This is about Q I S Public and High School!')
                             .addBasicCard(app.buildBasicCard('OUR SCHOOL Making quality education a possible dream for every child, irrespective of caste and ' +
                             ' community is the primary mission of QIS Public School and High School. Education being the noblest  ' +
                             'practice in shaping up a child\'s future, the school deems to impart a strong sense of ' +
                             'culture, values & deep understanding in them. It believes that these futuristic kids ' +
                             'today can play a significant role in building the nation, tomorrow.')
                            .setTitle('About'))
                            .addSuggestions(['QIS School Vision', 'QIS School Mission', 'QIS School Contact-us', 'QIS School Quick Brief']));
                    } else if (param === 'QIS Degree & PG College') {
                             app.ask(app.buildRichResponse()
                             .addSimpleResponse('This is about Q I S Degree & PG College!')
                             .addBasicCard(app.buildBasicCard('QIS DEGREE & PG COLLEGE is Affiliated to ' +
                             'Acharya Nagarjuna University and Approved by National Council ' +
                             'For Teacher Education (NCTE), Vengamukkalapalem, Ongole, M: 92464-19547')
                             .setTitle('About'))
                             .addSuggestions(['QIS Degree Vision', 'QIS Degree Mission', 'QIS PG Contact-us','QIS Degree Quick Brief']));
                   } else if (param === 'Sri Nidamanuri Educational Society') {
                             app.ask(app.buildRichResponse()
                             .addSimpleResponse('This is about Sri Nidamanuri Educational Society')
                             .addBrowseCarousel(app.buildBrowseCarousel()
                             // Add the items to the carousel
                             .addItems([
                             app.buildBrowseItem("Sri Nidamanuri Educational Society 😍","https://goo.gl/fw7e4a")
                             .setImage('https://goo.gl/fw7e4a', 'Sri Nidamanuri Educational Society'),
                             app.buildBrowseItem("Golden Moments 😍","https://goo.gl/zD3apr")
                             .setImage('https://goo.gl/zD3apr', 'Golden Moments')
                             ])
                             )
                             .addSuggestions(['QISCET', 'QISP','QISIT','QIS High School','QIS Public school','QIS Degree & PG College']));
                    }
    },
    'say.code': () => {
         const QISIT = 'Q I S Institute of Technology';
         const QISCET='Q I S College of Engineering and Technology';
         const QISP = 'Q I S College of Pharmacy';
         let con=app.getContextArgument('institution','Ins');
         let In=app.getArgument('Ins');
         let sit=con.value;
        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) 
         {
                  if((In==QISCET)||(sit==QISCET))
                   {
                       app.ask(app.buildRichResponse()
                       .addSimpleResponse('Q I S College of Engineering & Technology Counselling Code is')
                       .addSimpleResponse('QISE!')
                      .addSuggestions(['QISCET Vision','QISCET Mission','QISCET Courses Offered','QISCET Quick Brief']));
                   }
                   else if((In==QISIT)||(sit==QISIT))
                    {
                        app.ask(app.buildRichResponse()
                       .addSimpleResponse('Q I S Institute of Technology Counselling Code is')
                       .addSimpleResponse('QITO!')
                      .addSuggestions(['QISIT Vision','QISIT Mission','QISIT Courses Offered','QISIT Quick Brief']));
                    }
                   else if((In==QISP)||(sit==QISP))
                   {
                        app.ask(app.buildRichResponse()
                       .addSimpleResponse('Q I S College of Pharmacy Counselling Code is')
                       .addSimpleResponse('QISP!')
                      .addSuggestions(['QISP Vision','QISP Mission','QISP Courses Offered','QISP Quick Brief']));
                   }
                   else
                    {
                       app.ask(app.buildRichResponse()
                      .addSimpleResponse('Q I S has three Engineering Colleges!'+
                      '\nWhich Institution Counselling Code you want to know?')
                     .addSuggestions(['QISCET code','QISIT code','Counselling code of QISP']));
                   }
                   
             }
         else {
             
                  if((In==QISCET)||(sit==QISCET))
                   {
                        app.ask('Q I S College of Engineering & College\n Counselling Code is QISE!\n'+
                      'Do you want to know about Q I S College of Engineering & Technology\'s Vision,\n Mission or QISCET full form?');
                   }
                   else if((In==QISIT)||(sit==QISIT))
                    {
                        app.ask('Q I S Institute of Technology Counselling Code is \n QITO!\n'+
                      'Do you want to know about Q I S Institute of Technology\'s Vision,\n Mission or QISIT full form?');
                    }
                   else if((In==QISP)||(sit==QISP))
                   {
                         app.ask('Q I S College of Pharmacy Counselling Code is \n QISP!\n'+
                      'Do you want to know about Q I S College of Pharmacy\'s Vision,\n Mission or QISP full form?');
                   }
              else  
              {
                  app.ask('Q I S has three Engineering Colleges!\n'+
                      'Which Institution Counselling Code you want to know?\n'+'Either Q I S College of Engineering & Technology code or\n'+
                      'Q I S Institute of Technology code or\n'+'Q I S College of Pharmacy code?');
              }
         }
    },
    'tell.vision': () => {
        const QISIT = 'Q I S Institute of Technology';
        const QISCET='Q I S College of Engineering and Technology';
        const QISP = 'Q I S College of Pharmacy';
        const QISH = 'Q I S High School';
        const QISC = 'Q I S Public School';
        const QISDP = 'Q I S Degree & PG College';
        const SNES = 'Sri Nidamanuri Educational Society';
        const QIS='Q I S';
        const QISE='QISE';
        let Ins=app.getArgument('Ins');
        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
        if(Ins==QISCET) {
         app.ask(app.buildRichResponse()
         .addSimpleResponse('This is the vision of Q I S College of Engineering & Technology')
         .addBasicCard(app.buildBasicCard('To provide high quality education by '+
         'introducing innovation and creativity in academics and research with societal'+
         'commitment and to be the knowledge hub in the region and to produce skilled '+
         'human resources with strong leadership capabilities to kindle the knowledge-driven'+
         ' economy of the nation and to make ethically strong citizens.') 
         .setTitle('Vision'))
         .addSuggestions(['QISCET Mission','QISCET Contact-us', 'QISCET Counselling Code','QISCET Quick Brief']));
        }
        else if(Ins==QISIT)
        {
          app.ask(app.buildRichResponse()
         .addSimpleResponse('This is the vision of Q I S Institute of Technology')
         .addBasicCard(app.buildBasicCard('To transform ourselves into a world class '+
         'engineering college of high academic standards satisfying the technical needs of the community') 
         .setTitle('Vision'))
         .addSuggestions(['QISIT Mission','QISIT Contact-us', 'QISIT Counselling Code','QISIT Quick Brief']));  
        }
        else if(Ins==QISP)
        {
          app.ask(app.buildRichResponse()
          .addSimpleResponse('This is the vision of Q I S College of Pharmacy')
          .addBasicCard(app.buildBasicCard('Vision of QIS College of pharmacy is to achieve excellence '+
          'in innovative pharmacy education, practices, services to the society and the profession '+
         ', and thus improve the health care of the community and the country.') 
         .setTitle('Vision'))
         .addSuggestions(['QISP Mission','QISP Contact-us', 'QISP Counselling Code','QISP Quick Brief']));  
        }
        else if(Ins==QIS||Ins==QISE||Ins==QISC||Ins==QISH||Ins==SNES||Ins==QISDP)
        {
          app.ask(app.buildRichResponse()
         .addSimpleResponse('This is the vision')
         .addBasicCard(app.buildBasicCard('To provide high quality education by '+
         'introducing innovation and creativity in academics') 
         .setTitle('Vision'))
         .addSuggestions(['QISCET','QISIT','QISP','SNES','Persons behind QIS','Persons behind QISE']));
        }
       
     }
     else {
         if(Ins==QISCET) {
         app.ask('The vision of Q I S College of Engineering & Technology is '+
         'to provide high quality education by '+
         'introducing innovation and creativity in academics and research with societal'+
         'commitment and to be the knowledge hub in the region and to produce skilled '+
         'human resources with strong leadership capabilities to kindle the knowledge-driven'+
         ' economy of the nation and to make ethically strong citizens.\nDo you want to know about Q I S College \nof Engineering & Technology\'s Mission\n ,or QISCET Counselling Code '+
         'or QISCET Abbreviation?');
         
        }
        else if(Ins==QISIT)
        {
          app.ask('The vision of Q I S Institute of Technology is'+
         'to transform ourselves into a world class '+
         'engineering college of high academic standards satisfying the technical needs of the community'+
         '\nDo you want to know about Q I S Institute of Technology\'s Mission or \nQISIT counselling code '+
         'or QISIT Full form?');
          
        }
         else if(Ins==QISP)
        {
          app.ask('The vision of Q I S College of Pharmacy is '+
         'Vision of QIS College of pharmacy is to achieve excellence '+
         'in innovative pharmacy education, practices, services to the society and the profession '+
         ', and thus improve the health care of the community and the country'+
         '\nDo you want to know about Q I S College of Pharmacy\'s Mission or\n'+
         ' QISP code or QISP Full form?');
        }
        else if(Ins==QIS||Ins==QISE||Ins==QISC||Ins==QISH||Ins==SNES||Ins==QISDP)
        {
          app.ask('To provide high quality education by\n '+
         'introducing innovation and creativity in academics.\nWhich institution do you '+
         'want to know about?\n Q I S College of engineering & Technology or Q I S College of Pharmacy\n'+
         ' or Q I S Institute of Technology or Q I S Degree & PG College or Q I S School?');
        }
     }
    },
    'say.mission':() => {
        const QISIT = 'Q I S Institute of Technology';
        const QISCET='Q I S College of Engineering and Technology';
        const QISP = 'Q I S College of Pharmacy';
        const QISH = 'Q I S High School';
        const QISC = 'Q I S Public School';
        const QISDP = 'Q I S Degree & PG College';
        const SNES = 'Sri Nidamanuri Educational Society';
        const QIS='Q I S';
        const QISE='QISE';
        let Ins=app.getArgument('Ins');
        if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) {
        if(Ins==QISCET) {
        app.ask(app.buildRichResponse()
        .addSimpleResponse('This is mission of Q I S College of Engineering & Technology')
        .addBasicCard(app.buildBasicCard('The College is committed to develop through good'+
        ' governance, resource building, quality teaching-learning, high impact research,'+
        ' constructive community engagement, well trained skilled human power in line with National'+
        ' development, capacity buiding, knowledge management and the continuing education'+
        ' programmes')
        .setTitle('Mission'))
        .addSuggestions(['QISCET Vision','QISCET Contact-us', 'QISCET Counselling Code','QISCET Quick Brief']));
        }
        else if(Ins==QISIT)
        {
          app.ask(app.buildRichResponse()
         .addSimpleResponse('This is the mission of Q I S Institute of Technology')
         .addBasicCard(app.buildBasicCard('To develop QISIT into a "CENTRE OF EXCELLENCE"'+
         ' offering engineering education to men and women at undergraduate and postgraduate'+
         ' degree levels, bringing out their total personality emphasizing ethical'+
         ' values and preparing them to meet the growing challenges of the industry and '+
         'diverse societal needs of our nation')
         .setTitle('Mission'))
         .addSuggestions(['QISIT Vision','QISIT Contact-us', 'QISIT Counselling Code','QISIT Quick Brief']));  
        }
        else if(Ins==QISP)
        {
          app.ask(app.buildRichResponse()
          .addSimpleResponse('This is the mission of Q I S College of Pharmacy')
          .addBasicCard(app.buildBasicCard('QIS College of pharmacy envisages becoming a center of excellence '+
          'in providing high quality education, training and research to individuals in acquiring '+
         'extensive knowledge in the field of pharmaceutical sciences.') 
         .setTitle('Mission'))
         .addSuggestions(['QISP Vision','QISP Contact-us', 'QISP Counselling Code','QISP Quick Brief']));  
        } 
        else if(Ins==QIS||Ins==QISE||Ins==QISC||Ins==QISH||Ins==SNES||Ins==QISDP)
        {
          app.ask(app.buildRichResponse()
         .addSimpleResponse('This is the mission')
         .addBasicCard(app.buildBasicCard('The College is committed to develop through good\n'+
         ' governance, resource building, quality teaching-learning') 
         .setTitle('Mission'))
         .addSuggestions(['QISCET','QISIT','QISP','SNES','Persons behind QIS','Persons behind QISE']));
        }
      } 
      else {
         if(Ins==QISCET) {
         app.ask('The College is committed to develop through good\n'+
         ' governance, resource building, quality teaching-learning, high impact research,\n'+
         ' constructive community engagement, well trained skilled human power in line with National\n'+
         ' development, capacity buiding, knowledge management and the continuing education'+
         ' programmes\nDo you want to know about Q I S College \nof Engineering & Technology\'s Vision\n ,or QISCET Counselling Code '+
         'or QISCET Abbreviation?');
         
        }
        else if(Ins==QISIT)
        {
          app.ask('To develop QISIT into a "CENTRE OF EXCELLENCE"'+
         ' offering engineering education to men and women at undergraduate and postgraduate'+
         ' degree levels, bringing out their total personality emphasizing ethical'+
         ' values and preparing them to meet the growing challenges of the industry and '+
         'diverse societal needs of our nation \nDo you want to know about Q I S Institute of Technology\'s Vision or \nQISIT counselling code '+
         'or QISIT Full form?');
          
        }
         else if(Ins==QISP)
        {
          app.ask('QIS College of pharmacy envisages becoming a center of excellence '+
          'in providing high quality education, training and research to individuals in acquiring '+
         'extensive knowledge in the field of pharmaceutical sciences.\nDo you want to know about Q I S College of Pharmacy\'s Vision or\n'+
         ' QISP code or QISP Full form?');
        }
        else if(Ins==QIS||Ins==QISE||Ins==QISC||Ins==QISH||Ins==SNES||Ins==QISDP)
        {
          app.ask('The College is committed to develop through good\n'+
         ' governance, resource building, quality teaching-learning.\nWhich institution do you '+
         'want to know about?\n Q I S College of engineering & Technology or Q I S College of Pharmacy\n'+
         ' or Q I S Institute of Technology or Q I S Degree & PG College or Q I S School?');
        }
        
     }
    },
    'About.Persons': () => {
         const Principal='Principal';
         const ChairmanPer='Chairman';
         const SecretaryPer='Secretary';
         const CorrespondentPer='Correspondent';
         const President='President';
         const Persons='Persons'
         const QISIT = 'Q I S Institute of Technology';
         const QISCET='Q I S College of Engineering and Technology';
         const QISP = 'Q I S College of Pharmacy';
         const QISH = 'Q I S High School';
         const QISC = 'Q I S Public School';
         const QISDP = 'Q I S Degree & PG College';
         const SNES = 'Sri Nidamanuri Educational Society';
         const QIS='Q I S';
         const QISE='QISE';
         let role=app.getArgument('person');
         let con=app.getContextArgument('institution','Ins');
         let Ins=app.getArgument('Ins');
         let sit=con.value;
         if (app.hasSurfaceCapability(app.SurfaceCapabilities.SCREEN_OUTPUT)) 
         {
                  if(role==President)
                    {
                      app.ask(app.buildRichResponse()
                      .addSimpleResponse('The President of Q I S is:')
                      .addBasicCard(app.buildBasicCard('Sri Nidamanuri Nageswara Rao\n'+
                      'A National Merit Scholarship holder during his engineering education'+
                      ' ,an embodiment of discipline and man at the helm of affairs of '+
                     'QIS Educational Institutions.') 
                     .setTitle('Sri Nidamanuri Nageswara Rao ')
                     .setImage('https://storage.googleapis.com/qisguideappimages/Persons_Pics/Nageswara-Rao.png',
                     'Sri Nidamanuri Nageswara Rao ')
                     .setImageDisplay('WHITE'))
                     .addSuggestions(['Chairman of QIS','Principal of QIS School','Principal of QISP','Principal of QISCET','Principal of QISIT']));
                    }
                     if((role==ChairmanPer)||(role==SecretaryPer)||(role==CorrespondentPer))
                    {
                        app.ask(app.buildRichResponse()
                       .addSimpleResponse('The President of Q I S is:')
                       .addBasicCard(app.buildBasicCard('*Founder and Secretary & Correspondent*\n'+
                       'Trained in the US in the latest computer technologies and software development'+
                      ' ,and keenly interested in the domain of thr technological research.') 
                      .setTitle('Sri N.Sri Surya Kalyan Chakravarthy ')
                     .setImage('https://storage.googleapis.com/qisguideappimages/Persons_Pics/Kalyan-Chakravarthy.png',
                     'Sri N.Sri Surya Kalyan Chakravarthy ')
                     .setImageDisplay('WHITE'))
                     .addSuggestions(['President of SNES','Principal of QIS School','Principal of QISP','Principal of QISCET','Principal of QISIT']));
                    }
                  

                  if((Ins==QISCET&&role==Principal)||(sit==QISCET))
                   {
                       if(role==Principal)
                       {
                         app.ask(app.buildRichResponse()
                         .addSimpleResponse('The Principal of Q I S College of Engineering & Technology is:')
                         .addBasicCard(app.buildBasicCard('Official Address:\n'+ 
                         'Principal\n,'+
                         'QISCET, Vengamukkapalem, Ongole- 523 272\n'+
                         'Andhra Pradesh (India)\n,'+ 
                         ' Mobile: +91-94419-16190') 
                         .setTitle('DR.Kilari Veeraswamy')
                         .setImage('https://storage.googleapis.com/qisguideappimages/Persons_Pics/VeeraSwamy.jpg',
                         'Kilari Veeraswamy')
                         .setImageDisplay('WHITE'))
                         .addSuggestions(['Chairman of QIS','President of SNES','Principal of QISP','Principal of QISIT','Principal of QIS School']));
                        }
                        else if((role==Persons)&&(Ins==QISCET))
                        {
                            app.ask(app.buildRichResponse()
                         .addSimpleResponse('Our core team of Q I S College of Engineering & Technology:')
                         .addBasicCard(app.buildBasicCard('*Our core team members of QIS College of Engineering & Technology!* ')
                         .setImage('https://storage.googleapis.com/qisguideappimages/Persons_Pics/Persons_QISCET.jpg',
                         'Core team members ')
                         .setTitle('QISCET Core team')
                         
                         .setImageDisplay('WHITE'))
                         .addSuggestions(['President of SNES','chairman of QIS','Principal of QIS School','Principal of QISP','Principal of QISCET','Principal of QISIT']));
                        }
                    }
                   else if(((Ins==QISIT)&&(role==Principal))||(sit==QISIT))
                    {
                        if(role==Principal)
                        {
                         app.ask(app.buildRichResponse()
                         .addSimpleResponse('The Principal of Q I S Institute of Technology is:')
                         .addBasicCard(app.buildBasicCard('Official Address:\n'+ 
                         'Principal\n,'+
                         'QISIT, Vengamukkapalem, Ongole- 523 272\n'+
                         'Andhra Pradesh (India)') 
                         .setTitle('DR.C.V.SUBBA RAO ')
                         .setImage('https://storage.googleapis.com/qisguideappimages/Persons_Pics/C.V.SUBBA%20RAO%20.jpg',
                         'DR.C.V.SUBBA RAO')
                         .setImageDisplay('WHITE'))
                         .addSuggestions(['Chairman of QIS','President of SNES','Principal of QISP','Principal of QISCET','Principal of QIS School']));
                        }
                            
                    }
                   else if(((Ins==QISP)&&(role==Principal))||(sit==QISP))
                   {
                       if(role==Principal)
                        {
                         app.ask(app.buildRichResponse()
                         .addSimpleResponse('The Principal of Q I S Pharmacy is:')
                         .addBasicCard(app.buildBasicCard('Official Address:\n'+ 
                         'Principal\n,'+
                         'QISCP, Vengamukkapalem, Ongole- 523 272\n'+
                         'Andhra Pradesh (India)\n,'+ 
                         ' Mobile: +91-9246419548') 
                         .setTitle('DR.DURAISWAMY DHACHINAMOORTHI')
                         .setImage('https://storage.googleapis.com/qisguideappimages/qiscp-principal.jpg',
                         'DURAISWAMY DHACHINAMOORTHI')
                         .setImageDisplay('WHITE'))
                         .addSuggestions(['Chairman of QIS','President of SNES','Principal of QISCET','Principal of QISIT','Principal of QIS School']));
                       }
                    }
                    else if((((Ins==QISH)||(Ins==QISC))&&(role==Principal))||((sit==QISH)||(sit==QISC)))
                   {
                       if(role==Principal)
                        {
                         app.ask(app.buildRichResponse()
                         .addSimpleResponse('The Principal of Q I S Institute of Technology is:')
                         .addBasicCard(app.buildBasicCard('Official Address:\n'+ 
                         'Principal\n,'+
                         'QIS High School & Public School\n'+'Vengamukkapalem, Ongole- 523 272\n'+
                          'Andhra Pradesh, India') 
                         .setTitle('Paramkusem S R Kumar ')
                         .setImage('https://storage.googleapis.com/qisguideappimages/Persons_Pics/Paramkusem%20S%20R%20Kumar.jpg',
                        'Paramkusem S R Kumar')
                         .setImageDisplay('WHITE'))
                         .addSuggestions(['Chairman of QIS','President of SNES','Principal of QISP','Principal of QISCET','Principal of QISIT']));
                        }
                    }
                    else if((Ins==QIS)||(sit==QIS))
                   {
                       if(role==Persons)
                        {
                         app.ask(app.buildRichResponse()
                         .addSimpleResponse('Our core team of Q I S Educational Institutions:')
                         .addBasicCard(app.buildBasicCard('*Our core team members of QIS Educational Institutions!* ')
                         .setImage('https://storage.googleapis.com/qisguideappimages/Persons_Pics/Persons_QIS.jpeg','Core team members')
                         .setTitle('QIS Core team')
                         .setImageDisplay('WHITE'))
                         .addSuggestions(['President','chairman of QIS','Principal of QIS School','Principal of QISP','Principal of QISCET','Principal of QISIT']));
                        }
                    }
                    else if((Ins==QISE)||(sit==QISE))
                   {
                       if(role==Persons)
                        {
                         app.ask(app.buildRichResponse()
                         .addSimpleResponse('Our core team of Q I S Educational Institutions:')
                         .addBasicCard(app.buildBasicCard('*Our core team members of QIS Educational Institutions!* ')
                         .setImage('https://storage.googleapis.com/qisguideappimages/Persons_Pics/Persons_QISE.jpg',
                         'Core team members ')
                         .setTitle('QISE Core team')
                         .setImageDisplay('WHITE'))
                         .addSuggestions(['President of SNES','chairman of QIS','Principal of QIS School','Principal of QISP','Principal of QISCET','Principal of QISIT']));
                        }
                    }
                     
                    else if(role==Principal)
                   {
                     app.ask(app.buildRichResponse()
                     .addSimpleResponse('Q I S Educational Institutions has four Principals \n'+
                     'Which institution Principal do you want to know about?')
                     .addSuggestions(['Principal of QISP','Principal of QISCET','Principal of QISIT','Principal of QIS High school','Principal of QIS Public school']));
                    }
        }
       else
        {
          app.tell('App is still learning!');
        }
         
    },
    // Default handler for unknown or undefined actions
    'default': () => {
      // Use the Actions on Google lib to respond to Google requests; for other requests use JSON
      if (requestSource === googleAssistantRequest) {
        let responseToUser = {
          //googleRichResponse: googleRichResponse, // Optional, uncomment to enable
          //googleOutputContexts: ['weather', 2, { ['city']: 'rome' }], // Optional, uncomment to enable
          speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
          text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
        };
        sendGoogleResponse(responseToUser);
      } else {
        let responseToUser = {
          //data: richResponsesV1, // Optional, uncomment to enable
          //outputContexts: [{'name': 'weather', 'lifespan': 2, 'parameters': {'city': 'Rome'}}], // Optional, uncomment to enable
          speech: 'This message is from Dialogflow\'s Cloud Functions for Firebase editor!', // spoken response
          text: 'This is from Dialogflow\'s Cloud Functions for Firebase editor! :-)' // displayed response
        };
        sendResponse(responseToUser);
      }
    }
  };
  // If undefined or unknown action use the default handler
  if (!actionHandlers[action]) {
    action = 'default';
  }
  // Run the proper handler function to handle the request from Dialogflow
  actionHandlers[action]();
    // Function to send correctly formatted Google Assistant responses to Dialogflow which are then sent to the user
  function sendGoogleResponse (responseToUser) {
    if (typeof responseToUser === 'string') {
      app.ask(responseToUser); // Google Assistant response
    } else {
      // If speech or displayText is defined use it to respond
      let googleResponse = app.buildRichResponse().addSimpleResponse({
        speech: responseToUser.speech || responseToUser.displayText,
        displayText: responseToUser.displayText || responseToUser.speech
      });
      // Optional: Overwrite previous response with rich response
      if (responseToUser.googleRichResponse) {
        googleResponse = responseToUser.googleRichResponse;
      }
      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      if (responseToUser.googleOutputContexts) {
        app.setContext(...responseToUser.googleOutputContexts);
      }
      console.log('Response to Dialogflow (AoG): ' + JSON.stringify(googleResponse));
      app.ask(googleResponse); // Send response to Dialogflow and Google Assistant
    }
  }
  // Function to send correctly formatted responses to Dialogflow which are then sent to the user
  function sendResponse (responseToUser) {
    // if the response is a string send it as a response to the user
    if (typeof responseToUser === 'string') {
      let responseJson = {};
      responseJson.speech = responseToUser; // spoken response
      responseJson.displayText = responseToUser; // displayed response
      response.json(responseJson); // Send response to Dialogflow
    } else {
      // If the response to the user includes rich responses or contexts send them to Dialogflow
      let responseJson = {};
      // If speech or displayText is defined, use it to respond (if one isn't defined use the other's value)
      responseJson.speech = responseToUser.speech || responseToUser.displayText;
      responseJson.displayText = responseToUser.displayText || responseToUser.speech;
      // Optional: add rich messages for integrations (https://dialogflow.com/docs/rich-messages)
      responseJson.data = responseToUser.data;
      // Optional: add contexts (https://dialogflow.com/docs/contexts)
      responseJson.contextOut = responseToUser.outputContexts;
      console.log('Response to Dialogflow: ' + JSON.stringify(responseJson));
      response.json(responseJson); // Send response to Dialogflow
    }
  }
}
// Construct rich response for Google Assistant (v1 requests only)
const app = new DialogflowApp();
const googleRichResponse = app.buildRichResponse()
  .addSimpleResponse('This is the first simple response for Google Assistant')
  .addSuggestions(
    ['Suggestion Chip', 'Another Suggestion Chip'])
    // Create a basic card and add it to the rich response
  .addBasicCard(app.buildBasicCard(`This is a basic card.  Text in a
 basic card can include "quotes" and most other unicode characters
 including emoji 📱.  Basic cards also support some markdown
 formatting like *emphasis* or _italics_, **strong** or __bold__,
 and ***bold itallic*** or ___strong emphasis___ as well as other things
 like line  \nbreaks`) // Note the two spaces before '\n' required for a
                        // line break to be rendered in the card
    .setSubtitle('This is a subtitle')
    .setTitle('Title: this is a title')
    .addButton('This is a button', 'https://assistant.google.com/')
    .setImage('https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
      'Image alternate text'))
  .addSimpleResponse({ speech: 'This is another simple response',
    displayText: 'This is the another simple response 💁' });
// Rich responses for Slack and Facebook for v1 webhook requests
const richResponsesV1 = {
  'slack': {
    'text': 'This is a text response for Slack.',
    'attachments': [
      {
        'title': 'Title: this is a title',
        'title_link': 'https://assistant.google.com/',
        'text': 'This is an attachment.  Text in attachments can include \'quotes\' and most other unicode characters including emoji 📱.  Attachments also upport line\nbreaks.',
        'image_url': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
        'fallback': 'This is a fallback.'
      }
    ]
  },
  'facebook': {
    'attachment': {
      'type': 'template',
      'payload': {
        'template_type': 'generic',
        'elements': [
          {
            'title': 'Title: this is a title',
            'image_url': 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
            'subtitle': 'This is a subtitle',
            'default_action': {
              'type': 'web_url',
              'url': 'https://assistant.google.com/'
            },
            'buttons': [
              {
                'type': 'web_url',
                'url': 'https://assistant.google.com/',
                'title': 'This is a button'
              }
            ]
          }
        ]
      }
    }
  }
};

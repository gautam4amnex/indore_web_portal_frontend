$(function() {
	"use strict";

	// Some variables for later
	var dictionary, set_lang;
	var eng_lang = "english";
	var hindi_lang = "hindi";

	// Object literal behaving as multi-dictionary
	dictionary = {
		"english" : {

			/**
			 * SIDE BAR
			 */
			
			"_indore_header": "Indore Smart Map",
			"_rajwada_palace_heading" : "Rajwada Palace",
			"_rajwada_palace_description" : "Rajwada is a historical palace in Indore city. It was built by the Holkars of the Maratha Empire about two centuries ago. This seven storied structure is located near the Chhatris and serves today as a fine example of royal grandeur and architectural skills. The structure comprises two parts, the first one located at the heart of the city and the second one standing in the old part of the town. Rajwada palace exhibits a blend of Maratha styles, the palatial structure is sure to leave you spellbound. The entrance itself is beautiful with lofty archway and a giant wooden door covered with iron studs. As one makes his way through the entrance, one is greeted with a courtyard comprising Maratha arched Ganesha hall, a number of balconies with Maratha ornamentation, windows, and corridors, surrounded by galleried rooms.",
			"_daly_college_heading" : "The Daly College",
			"_daly_college_description" : "General Daly from the very first had evinced a great interest in education. He instituted the Residency College at Indore and paid close attention to its work and progress.He took a leading part in the discussion, which resulted in the foundation of the Mayo College at Ajmer. There is hardly a state in Central Indore, which does not point with pride to the schools and colleges that owe their origin to his initiatives.General Daly was a man of action himself; it was one of his well-known saying that 'a political officer who could not jump on a horse and ride fifty miles when duty called him wasn't worth keeping'.",
			"_krishnapura_chhatri_heading" : "Krishnapura Chhatri",
			"_krishnapura_chhatri_description" : "The Krishnapura Chhatri, also known as the Krishna Pura Chhatri are three chhatri located in Indore, Madhya Pradesh, India. The structures were built by the Holkars as cenotaphs to house the remains of the dynasty's rulers, leading to them also being known as the Holkar Chhatris. All three of the Chhatris are located half a kilometer from the palace-city of Rajwada, which was also built by the Holkar dynasty.",
			"_lal_bagh_heading" : "Lal Bagh Palace",
			"_lal_bagh_description" : "Lal Bagh Palace is one of the most spectacular buildings in Indore. It stands on the outskirts of the town, towards the southwest. It is a three storey building on the bank of the River Khan. The palace was built by Maharaja Shivaji Rao Holkar during 1886-1921. Situated amidst dry and dusty gardens, it is architecturally quite similar to the New Palace. Lal Bagh Palace once hosted many royal receptions and even today, reflects the life style and taste of the Holkar Rulers.",
			"_gandhi_hall_heading" : "The Gandhi Hall",
			"_gandhi_hall_description" : "The Gandhi Hall was originally known as King Edward Hall, but H. H. Yeshwant Rao Holkar II (reign: 1926 - 1948) renamed it in 1948, after the death of Mahatma Gandhi ! This town hall was designed & constructed by architect Mr. Charles Frederick Stevens from Mumbai at a cost of Rs. 2,50,000 and was inaugurated by Prince of Wales, George V in 1905 ! It was made in the Indo-Gothic style, made of White stones from Seoni & Red stones from Patan in M. P., has magnificent domes and minarets, and a huge clock-tower !",
			"_ganesh_mandir_heading" : "Khajarana Ganesh Mandir",
			"_ganesh_mandir_description" : "Khajrana Ganesha Temple was constructed by Rani Ahilyabai Holkar. This temple is one of the most famous Hindu temples in India.The main festival of this temple is vinayak chathurthi and was held in a grand manner in the month of August and september. The temple is taken over by the government. It is believed that in order to safeguard the idol from Aurangzeb, the idol was hidden in a well and in 1735, it was taken out from the well and a temple was established in 1735 by Ahilyabai Holkar belonging to the Holkar dynasty of the Maratha Empire.The temple has developed a lot over the years. The gate and the outer wall of the Garbhagriha is made of silver and different moods and festivals are depicted on it. The eyes of the deity are made of diamonds. The upper wall of the Garbhagriha is made of silver.",
			"_holkar_stadium_heading" : "Holkar Stadium",
			"_holkar_stadium_description" : "Holkar Cricket Stadium  earlier known as Maharani Usharaje Trust Cricket Ground. But in 2010, Madhya Pradesh Cricket Association renamed it after the Holkar dynasty of the Marathas that ruled Indore. Indore city has another International Cricket stadium 'Nehru Stadium' which was used for International matches until 31 March 2001.It has a seating capacity of around 30,000 spectators. It is also equipped with flood lights for night matches.",
			"_white_church_heading" : "White Church",
			"_white_church_description" : "White Church is  one of the oldest churches in central India. It was built by Governor General of India, Sir Robert M C Hamilton in the year 1858.  The church displays the ancient British architecture, which was prevalent in most of the protestant churches in Britain. The church was mainly built for the Christians living in India and the army personnel who came to the city often during the pre‐independence era.",
			"_rangpanchami_heading" : "Rang Panchami",
			"_rangpanchami_description" : "Rangapanchami is celebrated five days after Dulendi or Holi, but it is not the usual Holi colors that paint the atmosphere around, rather it is the color of music that fills the air. Indore has its own style of celebrating Rang Panchami. Here, it is celebrated like Dulendi, but colors are mixed with water and then poured on others. On the event of the festival, the local municipal corporation sprinkles color mixed water on the main streets of old Indore. Earlier, they used Fire Brigade vehicles for this purpose. Rangapanchami is an age old festival, which was celebrated during the Holkar reign and continues to be celebrated till date.",
			"_login": "Login",
			"_city_gis": "Smart Map",
			"_feedback": "Feedback",
			"_add_feedback": "Add Feedback",
			"_first_name": "First Name",
			"_plch_first_name": "Enter First Name",
			"_last_name": "Last Name",
			"_plch_last_name": "Enter Last Name",
			"_email_id": "Email Id",
			"_plch_email_id": "Enter Email Id",
			"_mobile_no": "Mobile No.",
			"_plch_mobile_no": "Enter Mobile No.",
			"_subject": "Subject",
			"_plch_subject": "Enter Subject",
			"_comment": "Comment",
			"_plch_comment": "Enter Comment",
			"_submit": "Submit",
			"_contact_us": "Contact Us",
			"_contact_us_iscdl1": "INDORE SMART CITY",
			"_contact_us_iscdl2": "DEVELOPMENT LIMITED",
			"_contact_us_address": "Nehru Park Campus, Indore, MP - 452003",
			"_contact_us_phone_no": "0731-2535572",
			"_contact_us_email": "smartcityindore16@gmail.com",
			"_it_policy_heading": "IT Policy",
			"_it_policy_description1": "We do not collect personal information for any purpose other than to respond to you (for example, to respond to your queries ). If you choose to provide us with personal information like filling out a Contact Us form with an e-mail address or postal address, and submitting it to us through the website, we use that information to respond to your message, and to help you get the information you have requested.",
			"_it_policy_description2": "When you browse, read pages, or download information on this website, we automatically gather and store certain technical information about your visit. This information never identifies who you are. The information we collect and store about your visit is listed below:",
			"_it_policy_li1":"The Internet domain of your service provider (e.g. mtnl.net.in) and IP address (an IP address is a number that is automatically assigned to your computer whenever you are surfing the web) from which you access our website.",
			"_it_policy_li2":"The type of browser (such as Firefox, Netscape, or Internet Explorer) and operating system (Windows, Linux) used to access our site.",
			"_it_policy_li3":"The date and time you access/accessed our site.",
			"_it_policy_li4":"The pages/URLs you have visited, and",
			"_it_policy_li5":"If you reached this website from another website, the address of that referring website.",
			"_it_policy_description3":"This information is only used to help us make the site more useful for you. With this data, we learn about the number of visitors to our site and the types of technology our visitors use. We never track or record information about individuals and their visits.",
			"_it_policy_description4":"When you view our website, we may store some data on your computer in the form of a \"cookie\" to automatically recognize your PC next time you visit. Cookies can help us in many ways, for example, by allowing us to tailor a website to better match your interests or to store your password to save you having to re-enter it each time. If you do not wish to receive cookies, please configure your Internet browser to erase all cookies from your computer's hard drive, block all cookies or to receive a warning before a cookie is stored.",
			"_copyright_policy_heading": "Copyright Policy",
			"_copyright_policy_description": "Contents of this website may not be reproduced partially or fully, without due permission from Indore Smart City Development Limited. If referred to as a part of another website, the source must be appropriately acknowledged. The contents of this website cannot be used in any misleading or objectionable context.",
			"_tc_heading": "Terms & Conditions",
			"_tc_description1": "This website is designed, developed and maintained by Indore Smart City Development Limited and by accessing this website, you unconditionally accept to be legally bound by the terms and conditions.",
			"_tc_description2": "If you do not agree to the mentioned terms and conditions, please do not access the website.",
			"_tc_description3": "If you continue to browse and use this website you are agreeing to comply with and be bound by the following terms and conditions of use.",
			"_tc_description4": "We reserve the right to change these conditions from time to time without notice. You acknowledge and agree that it is your responsibility to review these Terms & Conditions periodically to familiarize yourself with any modifications. Your continued use of this site after such modifications will constitute acknowledgment and agreement of the modified terms and conditions.",
			"_tc_li1": "In order to access certain details, you may be required to provide some information about yourself (such as identification, email, phone number etc.) as part of the registration process, or as part of your ability to use the details. You agree that any information you provide will always be accurate, correct, and up to date.",
			"_tc_li2": "Attempting to copy, duplicate, reproduce, sell, trade, or resell our information is strictly prohibited.From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).",
			"_tc_li3": "From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).",
			"_tc_li4": "Efforts have been made to ensure the accuracy and currency of the content on this website; however, the same should not be interpreted as a statement of law or used for any legal purposes.",
			"_tc_li5": "In case of any ambiguity or doubts, users are advised to verify / check with the concerned Department(s) and / or other source(s), and obtain appropriate professional advice.",
		},
		"hindi" : {

			/**
			 * SIDE BAR
			 */

			"_indore_header": "इंदौर स्मार्ट मैप",
			"_rajwada_palace_heading" : "राजवाड़ा महल",
			"_rajwada_palace_description" : "राजवाड़ा इंदौर शहर का एक ऐतिहासिक महल है। इसे लगभग दो शताब्दी पहले मराठा साम्राज्य के होल्करों द्वारा बनाया गया था। यह सात मंजिला संरचना छत्रियों के पास स्थित है और आज शाही भव्यता और वास्तुकला कौशल का बेहतरीन उदाहरण है। संरचना में दो भाग शामिल हैं, पहला शहर के केंद्र में स्थित है और दूसरा शहर के पुराने हिस्से में स्थित है। राजवाड़ा महल मराठा शैलियों के मिश्रण को प्रदर्शित करता है, महल की संरचना आपको मंत्रमुग्ध कर देती है। प्रवेश द्वार अपने आप में भव्य मेहराब और लोहे के स्टड से ढके एक विशाल लकड़ी के दरवाजे के साथ सुंदर है। जैसा कि एक प्रवेश द्वार के माध्यम से अपना रास्ता बनाता है, एक को एक आंगन के साथ बधाई दी जाती है जिसमें मराठा अलंकृत गणेश हॉल, मराठा अलंकरण के साथ कई बालकनी, खिड़कियां और गलियारे हैं, जो शहीद कमरों से घिरा हुआ है।",
			"_daly_college_heading" : "द डेली कॉलेज",
			"_daly_college_description" : "जनरल डेली ने पहले ही शिक्षा में एक बड़ी दिलचस्पी पैदा कर दी थी। उन्होंने इंदौर में रेजीडेंसी कॉलेज की स्थापना की और इसके काम और प्रगति पर पूरा ध्यान दिया। उन्होंने चर्चा में एक प्रमुख हिस्सा लिया, जिसके परिणामस्वरूप अजमेर में मेयो कॉलेज की नींव पड़ी। मध्य इंदौर में शायद ही कोई राज्य हो, जो उन स्कूलों और कॉलेजों के लिए गर्व की बात नहीं करता है, जो उनकी पहल के मूल हैं।जनरल डेली खुद कार्रवाई का आदमी था; यह उनकी प्रसिद्ध कहावत में से एक था कि 'एक राजनीतिक अधिकारी जो घोड़े पर कूद नहीं सकता था और पचास मील की दूरी पर सवारी कर सकता था जब कर्तव्य उसे' लायक 'कहा जाता था। ",
			"_krishnapura_chhatri_heading" : "कृष्णपुरा छत्री",
			"_krishnapura_chhatri_description" : "कृष्णपुरा छत्री, जिसे कृष्ण पुरा छत्री भी कहा जाता है, इंदौर, मध्य प्रदेश, भारत में स्थित तीन छत्री हैं। [१] होलकरों द्वारा राजवंशों के शासकों के अवशेषों को रखने के लिए संरचनाओं को सेनोटाफ के रूप में बनाया गया था, जिसके कारण उन्हें होलकर छत्रियों के नाम से भी जाना जाता था। तीनों छत्रियाँ राजवाड़ा के महल-शहर से आधा किलोमीटर की दूरी पर स्थित हैं, जिसे होलकर राजवंश ने भी बनवाया था।",
			"_lal_bagh_heading" : "लाल बाग पैलेस",
			"_lal_bagh_description" : "लाल बाग पैलेस इंदौर की सबसे शानदार इमारतों में से एक है। यह शहर के बाहरी इलाके में, दक्षिण-पश्चिम की ओर स्थित है। यह खान नदी के किनारे तीन मंजिला इमारत है। इस महल का निर्माण महाराजा शिवाजी राव होल्कर ने 1886-1921 के दौरान करवाया था। सूखे और धूल भरे बगीचों के बीच स्थित, यह वास्तुशिल्प रूप से न्यू पैलेस के समान है। लाल बाग पैलेस ने एक बार कई शाही स्वागतों की मेजबानी की और आज भी, होल्कर शासकों की जीवन शैली और स्वाद को दर्शाता है।",
			"_gandhi_hall_heading" : "गांधी हॉल",
			"_gandhi_hall_description" : "गांधी हॉल को मूल रूप से किंग एडवर्ड हॉल के रूप में जाना जाता था, लेकिन महात्मा गांधी की मृत्यु के बाद एच। एच। यशवंत राव होलकर द्वितीय (शासनकाल: 1926 - 1948) ने 1948 में इसका नाम बदल दिया! इस टाउन हॉल को मुंबई से आर्किटेक्ट श्री चार्ल्स फ्रेडरिक स्टीवंस ने डिजाइन और निर्माण किया था। 2,50,000 और 1905 में वेल्स के राजकुमार, जॉर्ज वी द्वारा उद्घाटन किया गया था! यह इंडो-गोथिक शैली में बनाया गया था, जो सिवनी के सफेद पत्थरों से बना था और एम। पी। में पाटन से लाल पत्थर, शानदार गुंबद और मीनारें, और एक विशाल घड़ी टॉवर है।",
			"_ganesh_mandir_heading" : "खजराना गणेश मंदिर",
			"_ganesh_mandir_description" : "खजराना गणेश मंदिर का निर्माण रानी अहिल्याबाई होल्कर ने करवाया था। यह मंदिर भारत के सबसे प्रसिद्ध हिंदू मंदिरों में से एक है। इस मंदिर का मुख्य त्योहार विनायक चतुर्थी है और इसे अगस्त और सितंबर के महीने में भव्य तरीके से आयोजित किया जाता है।मंदिर को सरकार ने अपने कब्जे में ले लिया है। ऐसा माना जाता है कि औरंगजेब से मूर्ति की रक्षा के लिए, मूर्ति को एक कुएं में छिपा दिया गया था और 1735 में, इसे कुएं से निकाल लिया गया था और 1735 में अहिल्याबाई होल्कर द्वारा मराठा साम्राज्य के होली वंश से संबंधित एक मंदिर की स्थापना की गई थी। ।पिछले कुछ वर्षों में मंदिर का काफी विकास हुआ है। गर्भगृह की बाहरी दीवार और दीवार चांदी से बनी है और इस पर विभिन्न मनोदशाओं और उत्सवों का चित्रण किया गया है। देवता की आंखें हीरे से बनी होती हैं। गर्भगृह की ऊपरी दीवार चांदी से बनी है।",
			"_holkar_stadium_heading" : "होल्कर स्टेडियम",
			"_holkar_stadium_description" : "होल्कर क्रिकेट स्टेडियम को पहले महारानी उषाराजे ट्रस्ट क्रिकेट ग्राउंड के नाम से जाना जाता था। लेकिन 2010 में, इंदौर पर शासन करने वाले मराठों के होलकर राजवंश के बाद मध्य प्रदेश क्रिकेट एसोसिएशन ने इसका नाम बदल दिया। इंदौर शहर में एक और अंतर्राष्ट्रीय क्रिकेट स्टेडियम 'नेहरू स्टेडियम' है जिसका उपयोग 31 मार्च 2001 तक अंतर्राष्ट्रीय मैचों के लिए किया जाता था।इसमें लगभग 30,000 दर्शकों की बैठने की क्षमता है। यह रात के मैचों के लिए फ्लड लाइट से भी लैस है।",
			"_white_church_heading" : "व्हाइट चर्च",
			"_white_church_description" : "व्हाइट चर्च मध्य भारत के सबसे पुराने चर्चों में से एक है। यह भारत के गवर्नर जनरल सर रॉबर्ट एम सी हैमिल्टन द्वारा 1858 में बनाया गया था। चर्च प्राचीन ब्रिटिश वास्तुकला को प्रदर्शित करता है, जो कि ब्रिटेन के अधिकांश विरोध चर्चों में प्रचलित था। चर्च मुख्य रूप से भारत में रहने वाले ईसाइयों और सेना के जवानों के लिए बनाया गया था, जो पूर्व era स्वतंत्रता युग के दौरान अक्सर शहर में आते थे।",
			"_rangpanchami_heading" : "रंग पंचमी",
			"_rangpanchami_description" : "रंगपंचमी को दुलेंडी या होली के पांच दिन बाद मनाया जाता है, लेकिन यह सामान्य होली रंग नहीं है जो चारों ओर के वातावरण को चित्रित करता है, बल्कि यह संगीत का रंग है जो हवा को भरता है। इंदौर में रंग पंचमी मनाने की अपनी शैली है। यहां, इसे दुलेंडी की तरह मनाया जाता है, लेकिन रंगों को पानी में मिलाया जाता है और फिर दूसरों पर डाला जाता है। त्योहार के मौके पर, स्थानीय नगर निगम पुराने इंदौर की मुख्य सड़कों पर रंग मिश्रित पानी का छिड़काव करता है। इससे पहले, उन्होंने इस उद्देश्य के लिए फायर ब्रिगेड वाहनों का इस्तेमाल किया। रंगपंचमी एक सदियों पुराना त्योहार है, जो होलकर शासनकाल के दौरान मनाया जाता था और आज तक मनाया जाता है।",
			"_login": "लॉगइन करें",
			"_city_gis": "स्मार्ट मैप",
			"_feedback": "प्रतिक्रिया",
			"_add_feedback": "प्रतिक्रिया जोड़ें",
			"_first_name": "मूल नाम",
			"_plch_first_name": "मूल नाम दर्ज करें",
			"_last_name": "अंतिम नाम",
			"_plch_last_name": "अंतिम नाम दर्ज करें",
			"_email_id": "ईमेल आईडी",
			"_plch_email_id": "ईमेल आईडी दर्ज करें",
			"_mobile_no": "मोबाइल नंबर",
			"_plch_mobile_no": "मोबाइल नंबर दर्ज करें",
			"_subject": "विषय",
			"_plch_subject": "विषय दर्ज करें",
			"_comment": "टिप्पणी",
			"_plch_comment": "टिप्पणी दर्ज करें",
			"_submit": "जमा करें",
			"_contact_us": "संपर्क करें",
			"_contact_us_iscdl1": "इंदौर स्मार्ट शहर",
			"_contact_us_iscdl2": "विकास लिमिटेड",
			"_contact_us_address": "नेहरू पार्क परिसर, इंदौर, एम पी - ४५२००३",
			"_contact_us_phone_no": "०७३१-२५३५५७२",
			"_contact_us_email": "स्मार्टसिटीइंदौर१६@जीमेल.कॉम",
			"_it_policy_heading": "आईटी नीति",
			"_it_policy_description1": "हम आपको जवाब देने के अलावा किसी भी उद्देश्य के लिए व्यक्तिगत जानकारी एकत्र नहीं करते हैं (उदाहरण के लिए, आपके प्रश्नों का जवाब देने के लिए)। यदि आप हमें एक ई-मेल पते या डाक पते के साथ हमसे संपर्क फ़ॉर्म भरने और वेबसाइट के माध्यम से हमें इसे सबमिट करने जैसी व्यक्तिगत जानकारी प्रदान करने का चयन करते हैं, तो हम आपके संदेश का जवाब देने के लिए और आपको प्राप्त करने में मदद करने के लिए उस जानकारी का उपयोग करते हैं। आपके द्वारा अनुरोधित जानकारी।",
			"_it_policy_description2": "जब आप इस वेबसाइट पर ब्राउज़ करते हैं, पृष्ठ पढ़ते हैं या जानकारी डाउनलोड करते हैं, तो हम आपकी यात्रा के बारे में कुछ तकनीकी जानकारी को स्वचालित रूप से इकट्ठा करते हैं और संग्रहीत करते हैं। यह जानकारी कभी भी यह नहीं बताती है कि आप कौन हैं। आपकी यात्रा के बारे में हम जो जानकारी एकत्र करते हैं और संग्रहीत करते हैं, वह नीचे सूचीबद्ध है:",
			"_it_policy_li1":"आपके सेवा प्रदाता का इंटरनेट डोमेन (उदा। Mtnl.net.in) और आईपी पता (एक आईपी पता एक संख्या है जो स्वचालित रूप से आपके कंप्यूटर को सौंपा जाता है जब भी आप वेब सर्फ कर रहे होते हैं) जिससे आप हमारी वेबसाइट तक पहुँचते हैं।",
			"_it_policy_li2":"ब्राउज़र का प्रकार (जैसे फ़ायरफ़ॉक्स, नेटस्केप या इंटरनेट एक्सप्लोरर) और ऑपरेटिंग सिस्टम (विंडोज, लिनक्स) हमारी साइट तक पहुंचने के लिए उपयोग किया जाता है।",
			"_it_policy_li3":"वह दिनांक और समय जब आप हमारी साइट तक पहुँचते / पहुँचते हैं।",
			"_it_policy_li4":"आपके द्वारा देखे गए पृष्ठ / URL और",
			"_it_policy_li5":"यदि आप किसी अन्य वेबसाइट से इस वेबसाइट पर पहुंचे, तो उस रेफ़रिंग वेबसाइट का पता।",
			"_it_policy_description3": "इस जानकारी का उपयोग केवल साइट को आपके लिए अधिक उपयोगी बनाने में हमारी सहायता के लिए किया जाता है। इस डेटा के साथ, हम अपनी साइट पर आगंतुकों की संख्या और हमारे आगंतुकों द्वारा उपयोग की जाने वाली तकनीक के प्रकारों के बारे में सीखते हैं। हम कभी भी व्यक्तियों और उनकी यात्राओं के बारे में जानकारी को ट्रैक या रिकॉर्ड नहीं करते हैं।",
			"_it_policy_description4": "जब आप हमारी वेबसाइट देखते हैं, तो हम आपके कंप्यूटर पर अगली बार आपके पीसी को देखने के लिए स्वचालित रूप से पहचानने के लिए \"कुकी\" के रूप में कुछ डेटा स्टोर कर सकते हैं। मिसाल के तौर पर कुकीज़ हमारी कई तरह से मदद कर सकती हैं, जैसे कि हमें किसी वेबसाइट को अपनी रुचियों से बेहतर मिलान करने के लिए या अपने पासवर्ड को स्टोर करने की अनुमति देकर, ताकि आप उसे हर बार फिर से दर्ज कर सकें। यदि आप कुकीज़ प्राप्त नहीं करना चाहते हैं, तो कृपया अपने कंप्यूटर के हार्ड ड्राइव से सभी कुकीज़ को मिटाने के लिए अपने इंटरनेट ब्राउज़र को कॉन्फ़िगर करें, सभी कुकीज़ को ब्लॉक करें या कुकी संग्रहीत होने से पहले चेतावनी प्राप्त करें।",
			"_copyright_policy_heading": "कॉपीराइट नीति",
			"_copyright_policy_description": "इंदौर स्मार्ट सिटी डेवलपमेंट लिमिटेड की अनुमति के बिना इस वेबसाइट की सामग्री को आंशिक रूप से या पूरी तरह से पुन: प्रस्तुत नहीं किया जा सकता है। यदि किसी अन्य वेबसाइट के हिस्से के रूप में संदर्भित किया जाता है, तो स्रोत को उचित रूप से स्वीकार किया जाना चाहिए। इस वेबसाइट की सामग्री का उपयोग किसी भी भ्रामक या आपत्तिजनक संदर्भ में नहीं किया जा सकता है।",
			"_tc_heading": "नियम एवं शर्तें",
			"_tc_description1": "यह वेबसाइट इंदौर स्मार्ट सिटी डेवलपमेंट लिमिटेड द्वारा डिज़ाइन, विकसित और अनुरक्षित है और इस वेबसाइट को एक्सेस करके, आप बिना शर्त नियम और शर्तों के अनुसार कानूनी रूप से बाध्य होना स्वीकार करते हैं।",
			"_tc_description2": "यदि आप उल्लिखित नियमों और शर्तों से सहमत नहीं हैं, तो कृपया वेबसाइट तक न पहुँचें।",
			"_tc_description3": "यदि आप इस वेबसाइट को ब्राउज़ करना और उपयोग करना जारी रखते हैं, जिसका आप पालन करने के लिए सहमत हैं और उपयोग के निम्नलिखित नियमों और शर्तों से बाध्य हैं।",
			"_tc_description4": "हम बिना सूचना के इन स्थितियों को समय-समय पर बदलने का अधिकार सुरक्षित रखते हैं। आप स्वीकार करते हैं और सहमत हैं कि किसी भी संशोधनों के साथ खुद को परिचित करने के लिए समय-समय पर इन नियमों और शर्तों की समीक्षा करना आपकी जिम्मेदारी है। इस तरह के संशोधनों के बाद इस साइट का आपका निरंतर उपयोग संशोधित नियमों और शर्तों की पावती और समझौते का गठन करेगा।",
			"_tc_li1": "कुछ विवरणों तक पहुंचने के लिए, आपको पंजीकरण प्रक्रिया के भाग के रूप में या विवरणों का उपयोग करने की अपनी क्षमता के हिस्से के रूप में अपने बारे में कुछ जानकारी (जैसे पहचान, ईमेल, फोन नंबर आदि) प्रदान करने की आवश्यकता हो सकती है। आप सहमत हैं कि आपके द्वारा प्रदान की जाने वाली कोई भी जानकारी हमेशा सही, सही और अद्यतित रहेगी।",
			"_tc_li2": "हमारी जानकारी को कॉपी, डुप्लिकेट, पुन: पेश, बेचने, व्यापार करने या फिर से बेचना करने का प्रयास करना पूरी तरह से प्रतिबंधित है।",
			"_tc_li3": "समय-समय पर इस वेबसाइट में अन्य वेबसाइटों के लिंक भी शामिल हो सकते हैं। ये लिंक आपकी सुविधा के लिए और जानकारी प्रदान करने के लिए दिए गए हैं। इनका आशय यह नहीं है कि हम वेबसाइटों का समर्थन करते हैं)। लिंक की गई वेबसाइट की सामग्री के लिए हमारी कोई ज़िम्मेदारी नहीं है।",
			"_tc_li4": "इस वेबसाइट पर सामग्री की सटीकता और मुद्रा सुनिश्चित करने के प्रयास किए गए हैं; हालाँकि, इसे कानून के एक बयान के रूप में व्याख्या नहीं किया जाना चाहिए या किसी कानूनी उद्देश्यों के लिए उपयोग नहीं किया जाना चाहिए।",
			"_tc_li5": "किसी भी अस्पष्टता या संदेह के मामले में, उपयोगकर्ताओं को सलाह दी जाती है कि वे संबंधित विभाग (ओं) और / या अन्य स्रोत के साथ सत्यापन / जांच करें और उचित पेशेवर सलाह लें।",
		}
	};
	

	// set language according to type
	set_lang = function(language) {
		if (dictionary.hasOwnProperty(language)) {

			$(".loader").fadeIn();

			$("[data-translate]").text(function() {
				var key = $(this).data("translate");
				if (dictionary.hasOwnProperty(language)) {
					if ($(this).is("input") || $(this).is("textarea")) {
						let value = dictionary[language][key];
						$(this).attr('placeholder', value)
					} else {
						let value = dictionary[language][key];
						$(this).text(value);
					}
				}
				$(".loader").fadeOut();
			});
		}
	};

	/**
	 * Hindi language
	 */
	$("#pills-hindi-tab").click(function() {
		set_lang(hindi_lang);
	});

	/**
	 * English language
	 */
	$("#pills-english-tab").click(function() {
		set_lang(eng_lang);
	});

	// Set initial language to English
	set_lang(eng_lang);
});

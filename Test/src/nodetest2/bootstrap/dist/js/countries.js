//States

var country_arr = new Array("Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh" , "Dadra and Nagar Haveli", "Daman and Diu", "Delhi" , "Goa" , "Gujarat" , "Haryana" , "Himachal Pradesh" , "Jammu and Kashmir" , "Jharkhand" , "Karnataka" , "Kerala" , "Lakshadweep" , "Madhya Pradesh" , "Maharashtra" , "Manipur" , "Meghalaya" , "Mizoram" , "Nagaland" , "Odisha" , "Puducherry" , "Punjab" , "Rajasthan" , "Sikkim" , "Tamil Nadu" , "Telengana" , "Uttar Pradesh" , "Uttaranchal" , "West Bengal"); 

//Districts

var s_a = new Array();
s_a[0] = "";
s_a[1] = "Andaman Islands|Nicobar Islands";
s_a[2] = "Adilabad|Anantapur|Chittoor|Cuddapah|East Godavari|Guntur|Hyderabad|Karimnagar|Khammam|Krishna|Kurnool|Mahbubnagar|Medak|Nalgonda|Nellore|Nizamabad|Prakasam|Rangareddi|Srikakulam|Vishakhapatnam|Vizianagaram|Warangal|West Godavari";
s_a[3] = "Changlang|East Kameng|East Siang|Kurung Kumey|Lohit|Lower Dibang Valley|Lower Subansiri|Papum Pare|Tawang|Tirap|Upper Dibang Valley|Upper Sian|Upper Subansiri|West Kameng|West Siang";	
s_a[4] = "Barpeta|Bongaigaon|Cachar|Darrang|Dhemaji|Dhuburi|Dibrugarh|Goalpara|Golaghat|Hailakandi|Jorhat|Kamrup|Karbi Anglong|Karimganj|Kokrajhar|Lakhimpur|Marigaon|Nagaon|Nalbari|North Cachar Hills|Sibsagar|Sonitpur|Tinsukia";
s_a[5] = "Araria|Aurangabad|Banka|Begusarai|Bhabua|Bhagalpur|Bhojpur|Buxar|Darbhanga|Gaya|Gopalganj|Jamui|Jehanabad|Katihar|Khagaria|Kishanganj|Lakhisarai|Madhepura|Madhubani|Munger|Muzaffarpur|Nalanda|Nawada|Pashchim Champaran|Patna|Purba Champaran|Purnia|RohtasSaharsa|Samastipur|Saran|Sheikhpura|Sheohar|Sitamarhi|Siwan|Supaul|Vaishali";
s_a[6] = "Chandigarh"
s_a[7] = "Bastar|Bilaspur|Dantewada|Dhamtari|Durg|Janjgir-Champa|Jashpur|Kanker|Kawardha|Korba|Koriya|Mahasamund|Raigarh|Raipur|Raj Nandgaon|Surguja";
s_a[8] = "Dadra and Nagar Haveli";
s_a[9] = "Daman|Junagadh";
s_a[10] = "Delhi";
s_a[11] = "North Goa|South Goa";
s_a[12]	= "Ahmadabad|Amreli|Anand|Banas Kantha|Bharuch|Bhavnagar|Dahod|Gandhinagar|Jamnagar|Junagadh|Kachchh|Kheda|Mahesana|Narmada|Navsari|Panch Mahals|Patan|Porbandar|Rajkot|Sabar Kantha|Surat|Surendranagar|The Dangs|Vadodara|Valsad";
s_a[13]	= "Ambala|Bhiwani|Faridabad|Fatehabad|Gurgaon|Hisar|Jhajjar|Jind|Kaithal|Karnal|Kurukshetra|Mahendragarh|Panchkula|Panipat|Rewari|Rohtak|Sirsa|Sonepat|Yamuna Nagar";
s_a[14]	= "Bilaspur|Chamba|Hamirpur|Kangra|Kinnaur|Kullu|Lahul and Spiti|Mandi|Shimla|Sirmaur|Sola|Una";
s_a[15]	= "Anantnag (Kashmir South)|Bagdam|Baramula (Kashmir North)|Doda|Jammu|kargil|Kathua|Kupwara (Muzaffarabad)|Ladakh (Leh)|Pulwama|Punch|Rajauri|Srinagar|Udhampur";
s_a[16]	= "Bokaro|Chatra|Deoghar|Dhanbad|Dumka|Garhwa|Giridih|Godda|Gumla|Hazaribag|Jamatra|Koderma|Latehar|Lohardaga|Pakur|Palamu|Pashchim |Singhbhum|Purba Singhbhum|Ranchi|Sahibganj|Saraikela Kharsawan|Simdega";
s_a[17]	= "Bagalkot|Bangalore Rural|Bangalore Urban|Belgaum|Bellary|Bidar|Bijapur|Chamrajnagar|Chikmagalur|Chitradurga|Dakshin Kannad|DavanagereDharwad|Gadag|Gulbarga|Hassan|Haveri|Kodagu|Kolar|Koppal|Mandya|Mysore|Raichur|Shimoga|Tumkur|Udupi|Uttar Kannand";
s_a[18]	= "Alappuzha|Ernakulam|Idukki|Kannur|Kasaragod|Kollam|Kottayam|Kozhikode|Malappuram|Palakkad|Pattanamtitta|Thiruvananthapuram|Thrissur|Wayanad";
s_a[19]	= "Kavaratti";
s_a[20]	= "Anuppur|Ashoknagar|Balaghat|Barwani|Betul|Bhind|Bhopal|Burhanpur|Chhatarpur|Chhindwara|Damoh|Datia|Dewas|Dhar|Dindori|East Nimar|Guna|Gwalior|Harda|Hoshangabad|Indore|Jabalpur|Jhabua|Katni|Mandla|Mandsaur|Morena|Narsinghpur|Neemuch|Panna|Raisen|Rajgarh|Ratlam|Rewa|Sagar|Satna|Sehore|Seoni|Shajapur|Sheopur|Shivpuri|Sidhi|Tikamgarh|Ujjain|Umaria|Vidisha|West Nimar";
s_a[21]	= "Ahmednagar|Akola|Amravati|Aurangabad|Bhandara|Bid|Buldana|Chandrapur|Dhule|Garhchiroli|Gondiya|Greater Bombay|Hingoli|Jalgaon|Jalna|Kolhapur|Latur|Nagpur|Nanded|Nandurbar|Nashik|Osmanabad|Parbhani|Pune|Raigarh|Ratnagiri|Sangli|Satara|Sindhudurg|Solapur|Thane|Wardha|Washim|Yavatmal";
s_a[22]	= "Bishnupur|Chandel|Churachandpur|East Imphal|Senapati|Tamenglong|Thoubal|Ukhrul|West Imphal";
s_a[23]	= "East Garo Hills|East Khasi Hills|Jaintia Hills|Ri-Bhoi|South Garo Hills|West Garo Hills|West Khasi Hills";
s_a[24]	= "Aizawl|Champhai|Kolasib|Lawngtlai|Lunglei|Mamit|Saiha|Serchhip";
s_a[25]	= "Dimapur|Kohima|Mokokchung|Mon|Phek|Tuensang|Wokha|Zunheboto";
s_a[26]	= "Angul|Baleshwar|Baragarh|Bhadrak|Bolangir|Boudh|Cuttack|Deogarh|Dhenkanal|Gajapati|Ganjam|Jagatsinghpur|Jajpur|Jharsuguda|Kalahandi|Kandhamal|Kendrapara||Keonjhar|Khordha|Koraput|Malkangiri|Mayurbhanj|Nabarangpur|Nayagarh|Nuapada|Puri|Rayagada|Sambalpur|Sonepur|Sundargarh";
s_a[27]	= "Karaikal|Mahe|Puducherry|Yanam";
s_a[28]	= "Amritsar|Bathinda|Faridkot|Fatehgarh Sahib|Firozpur|Gurdaspur|Hoshiarpur|Jalandhar|Kapurthala|Ludhiana|Mansa|Moga|Muktsar|Nawan|Shehar|Patiala|Rupnagar|Sangrur";
s_a[29]	= "Ajmer|Alwar||Banswara|Baran|Barmer|Bharatpur|Bhilwara|Bikaner|Bundi|Chittaurgarh|Churu|Dausa|Dhaulpur|Dungarpur|Ganganagar|Hanumangarh|Jaipur|Jaisalmer|Jalor|Jhalawar|Jhunjhunun|Jodhpur|Karauli|Kota|Nagaur|Pali|Rajsamand|Sawai Madhopur|Sikar|Sirohi|Tonk|Udaipur";
s_a[30]	= "East|North Sikkim|South Sikkim|West Sikkim";
s_a[31]	= "Ariyalur|Chennai|Coimbatore|Cuddalore|Dharmapuri|Dindigul|Erode|Kancheepuram|Kanniyakumari|Karur|Madurai|Nagapattinam|Namakkal|Nilgiris|Perambalur|Pudukkottai|Ramanathapuram|Salem|Sivaganga|Thanjavur|Theni|Thiruvallur|Thiruvarur|Thoothukudi|Tiruchchirappalli|Tirunelveli Kattabo|Tiruvannamalai|Vellore|Villupuram|Virudhunagar";
s_a[32]	= "Dhalai|North Tripura|South Tripura|West Tripura";
s_a[33]	= "Agra|Aligarh|Allahabad|Ambedkar Nagar|Auraiya|Azamgarh|Badaun|Baghpat|Bahraich|Ballia|Balrampur|Banda|Bara Banki|Bareilly|Basti|Bijnor|Bulandshahr|Chandauli|Chitrakoot|Deoria|Etah|Etawah|Faizabad|Farrukhabad|Fatehpur|Firozabad|Gautam Buddha Nagar|Ghaziabad|Ghazipur|Gonda|Gorakhpur|Hamirpur|Hardoi|Hathras|Jalaun|Jaunpur|Jhansi|Jyotiba Phule Nagar|Kannauj|Kanpur Dehat|Kanpur|Kaushambi|Kushinagar|Lakhimpur Kheri|Lalitpur|Lucknow|Maharajganj|Mahoba|Mainpuri|Mathura|Mau|Meerut|Mirzapur|Moradabad|Muzaffarnagar|Pilibhit|Pratapgarh|Rae Bareli|Rampur|Saharanpur|Sant Kabir Nagar|Sant Ravi Das Nagar|Shahjahanpur|Shravasti|Siddharth Nagar|Sitapur|Sonbhadra|Sultanpur|Unnao|Varanasi";
s_a[34]	= "Almora|Bageshwar|Chamoli|Champawat|Dehra Dun|Haridwar|Naini Tal|Pauri Garhwal|Pithoragarh|Rudra Prayag|Tehri Garhwal|Udham Singh Nagar|Uttarkashi"
s_a[35]	= "Bankura|Barddhaman|Birbhum|Dakshin Dinajpur|Darjiling|East Midnapore|Haora|Hugli|Jalpaiguri|Kochbihar|Kolkata|Maldah|Murshidabad|Nadia|North 24 Parganas|Puruliya|South 24 Parganas|Uttar Dinajpur|West Midnapore";

function populateDistricts( countryElementId, stateElementId ){
	
	var selectedCountryIndex = document.getElementById( countryElementId ).selectedIndex;

	var stateElement = document.getElementById( stateElementId );
	
	stateElement.length=0;	// Fixed by Julian Woods
	stateElement.options[0] = new Option('Select District','');
	stateElement.selectedIndex = 0;
	
	var state_arr = s_a[selectedCountryIndex].split("|");
	
	for (var i=0; i<state_arr.length; i++) {
		stateElement.options[stateElement.length] = new Option(state_arr[i],state_arr[i]);
	}
}

function populateStates(countryElementId, stateElementId){
	// given the id of the <select> tag as function argument, it inserts <option> tags
	var countryElement = document.getElementById(countryElementId);
	countryElement.length=0;
	countryElement.options[0] = new Option('Select State','-1');
	countryElement.selectedIndex = 0;
	for (var i=0; i<country_arr.length; i++) {
		countryElement.options[countryElement.length] = new Option(country_arr[i],country_arr[i]);
	}

	// Assigned all countries. Now assign event listener for the states.

	if( stateElementId ){
		countryElement.onchange = function(){
			populateDistricts( countryElementId, stateElementId );
		};
	}
}
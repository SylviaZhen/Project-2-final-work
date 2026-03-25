const params = new URLSearchParams(window.location.search)
const word = params.get("word")

const title = document.getElementById("title")
const text = document.getElementById("text")

const data = {

miss:{
title:"miss",
text:"Missing someone is often the safest confession. It admits distance but avoids the weight of naming love directly."
},

care:{
title:"care",
text:"Care is love in its quieter form. It appears in remembered details and small acts that never ask to be noticed."
},

cherish:{
title:"cherish",
text:"To cherish someone is to protect them inside memory and attention. It is affection handled gently."
},

like:{
title:"like",
text:"Like is the smallest doorway to something larger. A word that feels safe enough to say aloud."
},

hold:{
title:"hold dear",
text:"To hold someone dear is to carry them quietly inside your sense of value."
},

long:{
title:"long for",
text:"Longing stretches time. It turns absence into a space filled with quiet gravity."
},

choose:{
title:"choose",
text:"To choose someone again and again is a quieter form of devotion."
},

love:{
title:"love",
text:"Love is the word that gathers all the others and still exceeds them."
}

}

if(data[word]){
title.textContent=data[word].title
text.textContent=data[word].text
}
/* Salty Academy engine · the concept bank.
   One entry per teachable idea. IDs are permanent: rename the `name`, never the `id`. */
(function(root){
"use strict";
var U = root.SA_UTIL;

var ALL = [

/* ---- p1 · Why Websites Lose Customers ---- */
{ id:"c.p1.conversion", pack:"p1", name:"Conversion",
  plain:"The moment a visitor does the thing you wanted: books, buys, messages or calls.",
  example:"Two hundred people visit the dive shop site this week and nine send a booking request. Those nine are the conversions.",
  client:"Visits are not the score. The score is how many of them actually book.",
  aliases:["conversion","converts","books","booking","buys","takes action"] },

{ id:"c.p1.cta", pack:"p1", name:"Call to action",
  plain:"The button or line that tells the visitor exactly what to do next. One per screen beats three.",
  example:"A homepage with Book now, Learn more and Follow us gives three choices, so most people make none.",
  client:"Right now your page offers three next steps. Pick the one that pays you and make it impossible to miss.",
  aliases:["call to action","cta","button","next step","book now"] },

{ id:"c.p1.hero", pack:"p1", name:"The hero",
  plain:"The big first block of the page: headline, image and the main button. It does most of the selling.",
  example:"Arxon's hero says what he does and where in one line, so nobody has to scroll to understand.",
  client:"The first screen is the whole shop window. Everything below it is for people you already convinced.",
  aliases:["hero","first screen","top of the page","headline block"] },

{ id:"c.p1.fold", pack:"p1", name:"Above the fold",
  plain:"Everything visible before scrolling. Prime real estate, and most visitors never leave it.",
  example:"The opening hours sit in the footer, so the hungry visitor checks a competitor instead of scrolling.",
  client:"If it matters, it goes where nobody has to scroll for it.",
  aliases:["above the fold","before scrolling","without scrolling","first thing they see"] },

{ id:"c.p1.speed", pack:"p1", name:"Load time",
  plain:"How long from tap to a usable page. Past three seconds more than half of mobile visitors are gone.",
  example:"A cafe site with huge unresized photos takes six seconds on hotel wifi. The visitor never sees the menu.",
  client:"Your site takes six seconds to open. Half your phone visitors leave before it appears, and they never tell you.",
  aliases:["load time","loading","speed","slow","fast","three seconds","first paint"] },

{ id:"c.p1.bounce", pack:"p1", name:"Bounce",
  plain:"A visitor who lands and leaves without doing anything at all.",
  example:"She lands, scrolls twice, taps nothing, leaves. That is a bounce, and you never hear about it.",
  client:"Most of the people you lost never complained. They just left, and that is the number we are fixing.",
  aliases:["bounce","bounced","leaves","left without","back button"] },

{ id:"c.p1.friction", pack:"p1", name:"Friction",
  plain:"Anything that makes the visitor think, wait or guess. Every bit of it costs you customers.",
  example:"A booking form asking for a company name from a tourist on holiday adds friction for nothing.",
  client:"Every extra field, every extra tap, costs you a percentage of the people who were ready to book.",
  aliases:["friction","hesitate","extra step","makes them think","too many fields"] },

{ id:"c.p1.proof", pack:"p1", name:"Social proof",
  plain:"Evidence that other people already trusted you: real reviews, real clients, real numbers, real names.",
  example:"Two food stands side by side, one has a queue. You join the queue without anyone telling you to.",
  client:"Strangers believe other customers long before they believe your homepage. Put the proof where they doubt.",
  aliases:["social proof","proof","reviews","testimonials","evidence","references"] },

{ id:"c.p1.value-prop", pack:"p1", name:"Value proposition",
  plain:"One sentence saying what you offer, who it is for, and why you. If a competitor could paste it, it says nothing.",
  example:"We are passionate about quality fails the copy-paste test. Custom windsurfing sails, built on Bonaire, passes it.",
  client:"If your competitor could paste your homepage line onto their site and nobody would notice, it is not selling.",
  aliases:["value proposition","what you sell","one sentence","copy paste test","positioning line"] },

{ id:"c.p1.five-second", pack:"p1", name:"The five second test",
  plain:"Show anyone a homepage for five seconds, take it away, then ask: what do they sell, who is it for, what do I do next?",
  example:"Show your aunt the site for five seconds. If she cannot answer all three, a real visitor was already gone.",
  client:"Let me show your homepage to someone for five seconds and ask them three questions. That is the whole audit.",
  aliases:["five second test","5 second test","three questions","what do they sell"] },

{ id:"c.p1.choice-overload", pack:"p1", name:"Choice overload",
  plain:"Too many options slow the decision down until no decision happens at all.",
  example:"A menu of twelve services with equal weight means the visitor picks none and closes the tab.",
  client:"More options feels generous. It reads as work, and work gets postponed forever.",
  aliases:["choice overload","too many options","too many choices","paralysis"] },

{ id:"c.p1.credibility", pack:"p1", name:"Credibility",
  plain:"Whether a stranger decides in a second that you look trustworthy and still in business.",
  example:"A copyright line saying 2019 quietly tells every visitor the business might be gone.",
  client:"Three out of four people judge whether a company is real by the website alone. Yours is doing that job right now.",
  aliases:["credibility","builds trust","trustworthy","looks professional"] },

{ id:"c.p1.audit", pack:"p1", name:"The audit",
  plain:"A structured walk through a site the way a customer sees it, ending in a short list of fixes ranked by money.",
  example:"Speed, clarity, proof, in that order, with one sentence per problem and what it costs.",
  client:"I look at your site the way your customer does, and I send you the list of what is losing you bookings.",
  aliases:["audit","site review","fix list","walkthrough"] },

{ id:"c.p1.salesperson", pack:"p1", name:"The site is a salesperson",
  plain:"The website is your hardest working salesperson: on duty every hour, opening the door fast, making the offer clear and proving it.",
  example:"You would not hire a salesperson who takes six seconds to answer and then mumbles. That is a slow vague homepage.",
  client:"Think of the site as staff, not as a brochure. Right now that member of staff is losing you customers quietly.",
  aliases:["salesperson","hardest working","always on","staff member"] },

/* ---- p2 · Bottlenecks, Custom Software and AI ---- */
{ id:"c.p2.bottleneck", pack:"p2", name:"Bottleneck",
  plain:"The narrowest point in a business that everything else must pass through. It sets the speed for the whole operation, not just the part that is stuck.",
  example:"A scooter rental owner personally approves every booking request. When he is on holiday with his phone off, new bookings just wait, because he is the point everything squeezes through.",
  client:"Right now your business can only move as fast as the one point everything gets stuck at, and usually that point is you.",
  aliases:["bottleneck","stuck point","squeeze point","point everything passes through"] },

{ id:"c.p2.workflow", pack:"p2", name:"Workflow",
  plain:"The sequence of steps a task actually goes through from the moment it starts to the moment it is done, including every handoff along the way.",
  example:"A booking starts as a WhatsApp message, gets copied into a spreadsheet, then retyped again into an invoice. That whole path is the workflow, however messy it looks.",
  client:"Before I suggest anything, I want to see how a booking actually moves through your business today, step by step. That path is the workflow, and most owners have never mapped it.",
  aliases:["workflow","how it moves","steps a task takes","how a job travels"] },

{ id:"c.p2.automation", pack:"p2", name:"Automation",
  plain:"Software that follows fixed rules without a person deciding each time: when this happens, the system does that, exactly the same way every single time.",
  example:"When a booking confirms, the system sends the confirmation email automatically. Nobody has to remember to type it at eleven at night.",
  client:"Automation is rules, not magic. When a booking comes in, send the email. Boring, reliable, and it saves you real hours every week.",
  aliases:["automation","automatic","rules based","when this happens do that"] },

{ id:"c.p2.human-loop", pack:"p2", name:"Human in the loop",
  plain:"The system does the preparation and the running around, but a real person still gives the final approval before anything goes out to a customer.",
  example:"A scooter booking request lands on the owner's phone as a notification. He taps once to approve it, and only then does the confirmation email actually send.",
  client:"The machine does the legwork, but nothing reaches a customer without your yes. You are not losing control, you are losing the running around.",
  aliases:["human in the loop","one tap approve","you keep the yes","approval step"] },

{ id:"c.p2.integration", pack:"p2", name:"Integration",
  plain:"Two separate systems automatically exchanging data with each other, instead of a person copying the same information from one into the other by hand.",
  example:"The booking form and the invoicing tool are connected, so a confirmed booking creates the invoice on its own, with nobody retyping the customer's name a second time.",
  client:"Right now your systems do not talk to each other, so you are the cable between them. An integration makes them talk directly, and you stop being the cable.",
  aliases:["integration","systems talk to each other","stop being the cable","no retyping"] },

{ id:"c.p2.api", pack:"p2", name:"API",
  plain:"The official connection point a piece of software offers so other programs can plug into it and exchange data, instead of a person doing it by hand.",
  example:"The booking system uses the payment provider's API to check if a deposit actually landed, instead of someone opening the bank app every morning to check.",
  client:"Most modern software has a plug built in for exactly this, called an API. If your tools have one, we can usually connect them without rebuilding anything.",
  aliases:["api","the plug","connection point","if your tools have one"] },

{ id:"c.p2.single-source", pack:"p2", name:"Single source of truth",
  plain:"One place where the real, current, correct version of the data lives, so every other screen and document simply reads from that one place instead of keeping its own copy.",
  example:"The wife keeps the agenda, the husband keeps the counter book, and on a busy Saturday the same scooter gets rented out twice because the two lists disagree.",
  client:"You have two lists, and sooner or later two lists always disagree. One single source of truth means everyone is always looking at the same real answer.",
  aliases:["single source of truth","one list","one real list","lists disagreeing"] },

{ id:"c.p2.saas", pack:"p2", name:"Off the shelf software",
  plain:"Ready made subscription software built to fit a lot of different businesses reasonably well, rented monthly forever rather than owned.",
  example:"A generic booking plugin handles appointments fine for a hair salon, but a scooter rental with deposits, damage waivers and multi day pricing has to bend around its limits.",
  client:"Off the shelf software is rented, and it is built to fit almost everyone, which means it never quite fits you. It might still be the right call if your process is standard.",
  aliases:["saas","off the shelf","ready made software","subscription software"] },

{ id:"c.p2.custom-software", pack:"p2", name:"Custom software",
  plain:"Software built specifically around one business's exact way of working, owned rather than rented, made for the parts that make that business different.",
  example:"A scooter rental with its own deposit rules and license checks gets a booking system built around exactly that flow, instead of forcing the business to work around a generic tool.",
  client:"Custom software is built around how you actually work, not the other way around. It costs more upfront, but you own it, and it fits the part of your business that makes you money.",
  aliases:["custom software","built for you","bespoke system","owned not rented"] },

{ id:"c.p2.back-office", pack:"p2", name:"Back office",
  plain:"The internal screens the team uses to manage bookings, customers and money, hidden from customers and separate from the public facing website.",
  example:"Customers see a simple booking form, but behind it the owner has a back office screen listing every scooter, every booking and every payment status.",
  client:"Think of the back office as the control room behind your website. Customers never see it, but it is where your team actually runs the day.",
  aliases:["back office","control room","internal screens","customers never see it"] },

{ id:"c.p2.dashboard", pack:"p2", name:"Dashboard",
  plain:"One screen that shows the current state of the business at a glance, instead of the owner having to open several different tools to piece the picture together.",
  example:"Instead of checking WhatsApp, a spreadsheet and the bank app separately, the owner opens one dashboard that already shows today's bookings, revenue and open requests.",
  client:"Instead of hunting through three apps every morning, everything you need to know lands on one screen. That is a dashboard.",
  aliases:["dashboard","one screen","at a glance","stop hunting through apps"] },

{ id:"c.p2.process-map", pack:"p2", name:"Process mapping",
  plain:"Writing down, step by step, the repeated tasks a business actually runs on, so the real workflow is visible before anyone tries to fix or automate it.",
  example:"Before building anything, the team lists exactly what happens from the moment a booking request arrives to the moment the scooter is returned, including every WhatsApp message in between.",
  client:"Before we build anything, we sit down and list exactly what you repeat every single day. That list is free, and it is usually the first time anyone has written it down.",
  aliases:["process mapping","process map","writing down the steps","mapping the workflow"] },

{ id:"c.p2.quick-win", pack:"p2", name:"Quick win",
  plain:"A small first automation delivered fast, aimed at the most painful repeated task, built to prove the value of the bigger project before committing to it.",
  example:"Instead of a six month platform, the first project is just fixing the double booking problem, shipped in a week, so the owner feels relief before spending more.",
  client:"We are not starting with the whole platform. We are starting with the one thing that hurts most, fixing it fast, so you feel the difference before you commit to anything bigger.",
  aliases:["quick win","fast fix","first project","prove it fast"] },

{ id:"c.p2.scope", pack:"p2", name:"Scope",
  plain:"The agreed edge of a project, written down clearly: what is included, what is not, so nobody is surprised later about what was actually promised.",
  example:"The quote covers the booking system and the confirmation emails, but not a redesign of the website, and that line is written down before any work starts.",
  client:"Before we start, we write down exactly what is in and what is out, on paper. That way neither of us is guessing later about what was promised.",
  aliases:["scope","what is in what is out","project boundary","agreed edge"] },

{ id:"c.p2.manual-entry", pack:"p2", name:"Manual entry",
  plain:"A person typing in data that a machine somewhere already has, usually because two systems are not connected, and the root cause of most double entry mistakes.",
  example:"A booking gets typed into WhatsApp, then typed again into a spreadsheet, then typed a third time into an invoice, and each retype is a fresh chance for a mistake.",
  client:"Right now you are typing the same booking three times into three places. Every one of those retypes is a chance for a mistake that costs you a refund and a bad review.",
  aliases:["manual entry","typing it twice","double entry","retyping"] },

{ id:"c.p2.bottleneck-bill", pack:"p2", name:"The bottleneck bill",
  plain:"The yearly cost of a repeated manual task, worked out as hours spent per week times what an hour of that time is worth times fifty two weeks in a year.",
  example:"Ten hours a week spent on admin at fifty euros an hour works out to twenty six thousand euros a year, every year, for as long as nothing changes.",
  client:"Let's do the math with your own numbers. Ten hours a week at fifty an hour is twenty six thousand a year, forever, until we fix it. Nobody argues with their own numbers.",
  aliases:["bottleneck bill","hours times rate times 52","yearly cost of admin","do the math"] },

{ id:"c.p2.phone-test", pack:"p2", name:"The phone test",
  plain:"The question that tests how much of a business lives in one person's head: could the owner switch the phone off for two weeks and come back to a business that ran completely normally?",
  example:"Ask an owner the question and watch the face, not the answer. When every booking, question and payment squeezes through that one phone, two weeks off is not a holiday, it is a shutdown.",
  client:"Could you turn your phone off for two weeks without your business stopping? If the honest answer is no, you are the bottleneck, and that is not dedication, it is a queue with a yearly bill attached.",
  aliases:["phone test","turn your phone off","two week holiday","phone off two weeks"] },

/* ---- m1 · Website Building ---- */
{ id:"c.m1.ux", pack:"m1", name:"User experience",
  plain:"How easy it is for a visitor to actually do what they came for. It is the whole experience, not just how the site looks.",
  example:"A site can look stunning but still fail if the visitor cannot find the booking button in ten seconds. That is a UX problem, not a design problem.",
  client:"I check whether people can actually do what they came to do on your site, not just whether it looks nice.",
  aliases:["ux","user experience","how it feels to use","easy to use"] },

{ id:"c.m1.ui", pack:"m1", name:"User interface",
  plain:"The visible layer of a site: the buttons, the screens, the colors, the layout. What you literally see and tap.",
  example:"The blue book button, the photo grid and the menu at the top are all UI. Whether tapping that button actually gets you booked is UX.",
  client:"UI is the look. UX is whether it works. You can have a beautiful UI and still lose customers if the UX is confusing.",
  aliases:["ui","user interface","the look","buttons and screens"] },

{ id:"c.m1.seo", pack:"m1", name:"SEO",
  plain:"Earning a better spot in search results by being clear, trustworthy and fast, in the words customers actually search with.",
  example:"Google is the phonebook now. SEO makes sure the phonebook understands what you sell and where you are, so you show up when someone searches for it.",
  client:"SEO is not a trick or a switch. It is making your site say what you sell in the words your customers search with, and it takes months, not days.",
  aliases:["seo","search engine optimization","ranking","showing up on google"] },

{ id:"c.m1.local-seo", pack:"m1", name:"Local SEO",
  plain:"Getting the Google map box right: your business profile, reviews, photos and hours. For a local business this often matters more than anything else online.",
  example:"Someone searches scooter rental plus your town and three pins show up on a map with reviews. Whether you are one of those three pins is local SEO.",
  client:"Before we touch anything else, we check your Google map listing. For a local business that box usually brings in more customers than the rest of the site combined.",
  aliases:["local seo","google business profile","the map box","google maps listing"] },

{ id:"c.m1.responsive", pack:"m1", name:"Responsive",
  plain:"A site that rearranges itself to work properly on every screen size, from a small phone to a big desktop monitor.",
  example:"A menu that stacks neatly into one column on a phone but spreads across three columns on a laptop is responsive. A shrunk desktop layout squeezed onto a phone is not.",
  client:"Your site has to work on a phone screen, because that is where most of your visitors actually are. Responsive just means it reshapes to fit.",
  aliases:["responsive","mobile friendly","works on phones","adapts to screen size"] },

{ id:"c.m1.cms", pack:"m1", name:"CMS",
  plain:"The dashboard that lets the owner edit content, like text and photos, without needing a developer for every small change.",
  example:"Changing a price used to mean emailing the builder and waiting four days. With a CMS the owner logs in and changes it herself in a minute.",
  client:"A CMS is your own key to your own shop window. You change prices and photos yourself, in minutes, instead of waiting on someone else.",
  aliases:["cms","content management system","edit it yourself","your own key"] },

{ id:"c.m1.domain", pack:"m1", name:"Domain",
  plain:"The website's address, like yourbusiness.com. Rented yearly, and whoever controls it controls where visitors actually end up.",
  example:"An old web builder registered the domain under his own name. Now he wants five hundred euros to hand it back, because he was always holding the deed.",
  client:"Your domain is the deed to your shop. Some builders keep that deed in their own drawer. We make sure it is in your name, always.",
  aliases:["domain","web address","domain name","who owns the address"] },

{ id:"c.m1.hosting", pack:"m1", name:"Hosting",
  plain:"The computer where the site actually lives. The quality of that computer decides how fast the site loads and how often it stays up.",
  example:"A site hosted on cheap, far away servers takes six seconds to load on hotel wifi. Better hosting alone can cut that in half.",
  client:"Hosting is the land your site is built on. Cheap land shows up as a slow, unreliable site, even if everything else is done well.",
  aliases:["hosting","web hosting","where the site lives","the server"] },

{ id:"c.m1.frontend", pack:"m1", name:"Frontend",
  plain:"Everything the visitor actually sees and touches on a site: the pages, the buttons, the photos, the words.",
  example:"A failed confirmation email is invisible to a visitor. But a broken booking button is right there on the frontend, in their face.",
  client:"The frontend is the part your customers see. If something looks wrong to them, it is almost always a frontend problem.",
  aliases:["frontend","front end","what visitors see","the visible part"] },

{ id:"c.m1.backend", pack:"m1", name:"Backend",
  plain:"The machinery behind the screens: the processing, storage and logic that make the visible site actually work.",
  example:"A visitor never sees the backend, but if it breaks, forms stop submitting and confirmation emails stop sending, quietly, without warning.",
  client:"The backend is the machinery behind the screens. Visitors never see it directly, they only feel whether it works.",
  aliases:["backend","back end","the machinery","behind the screens"] },

{ id:"c.m1.https", pack:"m1", name:"HTTPS",
  plain:"An encrypted connection between the visitor and the site, shown as a padlock in the browser. Missing it triggers a scary warning.",
  example:"A shop site without HTTPS shows Not secure in the browser bar, and visitors quietly wonder if they can trust the people behind it.",
  client:"That padlock icon in the address bar is HTTPS. Without it, browsers warn your visitors, and warned visitors leave.",
  aliases:["https","ssl","the padlock","secure connection"] },

{ id:"c.m1.analytics", pack:"m1", name:"Analytics",
  plain:"Measuring who visits the site, where they come from and what they actually do once they arrive.",
  example:"Analytics might show that most visitors leave from the pricing page. That single number tells you exactly where to look first.",
  client:"Analytics is just knowing what your visitors actually do on your site, instead of guessing. It turns hunches into real answers.",
  aliases:["analytics","site stats","visitor data","tracking visitors"] },

{ id:"c.m1.landing-page", pack:"m1", name:"Landing page",
  plain:"A single page built for one specific audience and one specific action, with nothing else to distract from it.",
  example:"An ad for a holiday special sends people to a landing page with only that offer and one button, not the whole busy homepage.",
  client:"A landing page is one page with one goal. It exists so people who click your ad see exactly the offer, and nothing that distracts them from it.",
  aliases:["landing page","one page one goal","campaign page","dedicated page"] },

{ id:"c.m1.launch", pack:"m1", name:"Launch",
  plain:"The moment the finished site goes live on the real domain, where actual customers can find and use it.",
  example:"The site was ready for a week, but launch day is when it finally moved from a private preview link to the real, public address.",
  client:"Launch is the day your site goes live for real, on your own address, where your customers can actually find it.",
  aliases:["launch","go live","site goes live","launch day"] },

/* ---- m2 · Branding & Positioning ---- */
{ id:"c.m2.brand", pack:"m2", name:"Brand",
  plain:"The sum of what people think and say about a business when it is not in the room.",
  example:"Two coffee places sell the same beans at the same price, but one is always full because people already know what it stands for. That reputation is the brand.",
  client:"Your brand is what people say about you when you are not there to defend it. Everything we build should make that story better.",
  aliases:["your brand","reputation","what people say about you"] },

{ id:"c.m2.positioning", pack:"m2", name:"Positioning",
  plain:"The specific slot a business owns in a customer's head: for whom it is, and how it is different from the others.",
  example:"Five fruit stands sell the same produce, but everyone remembers the one with the sweet mangoes. That mango stand owns a slot nobody else does.",
  client:"If you do not choose your slot in people's heads, the market chooses one for you, and it is usually the cheapest one available.",
  aliases:["positioning","the slot you own","for whom","your spot in their head"] },

{ id:"c.m2.differentiator", pack:"m2", name:"Differentiator",
  plain:"A claim about the business that a competitor could not truthfully copy and paste onto their own site.",
  example:"Quality and service fails the test because anyone can say it. Every booking answered within a minute, day or night, only one company can honestly claim.",
  client:"If a competitor could paste your homepage sentence onto their own site and nobody would notice, that sentence is not selling anything.",
  aliases:["differentiator","what only you can say","copy paste test","competitors cannot claim"] },

{ id:"c.m2.niche", pack:"m2", name:"Niche",
  plain:"The audience or specialty a business deliberately narrows down to, instead of trying to be for everyone.",
  example:"A photographer who shoots weddings, products, pets and drone footage gets hired by nobody specific. A wedding photographer gets hired for weddings, and often the overflow too.",
  client:"Narrowing the message, not the door, means being clearly for someone. Everyone else can still come, but now someone actually remembers you.",
  aliases:["niche","who you are for","specialty","narrowed audience"] },

{ id:"c.m2.messaging", pack:"m2", name:"Messaging",
  plain:"The repeated core sentences a business uses to say what it offers, for whom, and why anyone should pick it.",
  example:"Your scooter is confirmed before you finish your coffee says more than we are passionate about quality, because it starts from the customer's situation, not the company's.",
  client:"Messaging is the handful of sentences you repeat everywhere. Good messaging starts with the customer's situation, not with we.",
  aliases:["messaging","the words you repeat","core message","what you say about yourself"] },

{ id:"c.m2.tone", pack:"m2", name:"Tone of voice",
  plain:"The personality that comes through in a business's words: formal, warm, playful or direct, and whether it stays the same everywhere.",
  example:"A business that sounds playful on Instagram, formal on its website and chaotic on its invoices feels like three different companies, even though it is one.",
  client:"Tone of voice is how your business sounds in writing. It should sound like the same person everywhere, not three different strangers.",
  aliases:["tone of voice","tone","how you sound","personality in writing"] },

{ id:"c.m2.visual-identity", pack:"m2", name:"Visual identity",
  plain:"The recognition system a business uses everywhere: its logo, colors, fonts and photo style, so it looks like itself wherever it shows up.",
  example:"The same blue, the same logo mark and the same photo style appear on the van, the invoice and the website, so a customer recognizes the business at a glance.",
  client:"Visual identity is your recognizable look. When it repeats everywhere, people start recognizing you before they even read a word.",
  aliases:["visual identity","logo and colors","how it looks","brand look"] },

{ id:"c.m2.brand-kit", pack:"m2", name:"Brand kit",
  plain:"The rulebook that says exactly how to apply the visual identity consistently, so every new flyer or post still looks like the same company.",
  example:"Without a brand kit, one flyer uses the wrong blue and a different font, and slowly the business starts looking like several different companies.",
  client:"A brand kit is the rulebook so everything you put out still looks like you, whoever actually makes it.",
  aliases:["brand kit","style guide","the rulebook","brand guidelines"] },

{ id:"c.m2.perceived-value", pack:"m2", name:"Perceived value",
  plain:"What people assume something costs before they even see the price, based purely on how it looks and presents itself.",
  example:"The exact same wine in a beautiful bottle sells for more than the same wine with a plain sticker label, and people swear the expensive one tastes better.",
  client:"People decide what you probably cost before they read your price. Raising how premium you look is often cheaper than lowering your price, and it lasts.",
  aliases:["perceived value","what you look like you cost","looks premium","pricing power"] },

{ id:"c.m2.touchpoint", pack:"m2", name:"Touchpoint",
  plain:"Any single place where a customer meets the brand: the website, the social pages, the invoice, even the van outside.",
  example:"A customer meets the brand on the website, then on Instagram, then on the invoice. Each one is a separate touchpoint, and each one should feel like the same company.",
  client:"Every place a customer bumps into your business is a touchpoint. If they all match, trust builds. If they clash, trust resets every time.",
  aliases:["touchpoint","everywhere they meet you","every interaction","brand contact point"] },

{ id:"c.m2.rebrand", pack:"m2", name:"Rebrand",
  plain:"Deliberately changing what a business stands for and how it is positioned, not just redesigning the logo.",
  example:"Repainting the flag does not change the country. A logo swap alone rarely changes anything a customer actually feels, unless the positioning changes too.",
  client:"A rebrand is worth doing when what you stand for actually changed. If only your taste in logos changed, that is a redesign, not a rebrand.",
  aliases:["rebrand","rebranding","changing what you stand for","more than a new logo"] },

{ id:"c.m2.audience", pack:"m2", name:"Target audience",
  plain:"The specific group of people a brand is actually built to attract, rather than trying to appeal to absolutely everyone.",
  example:"A boutique whose visuals whisper cheap ends up attracting bargain hunters, whether or not that is the audience it actually wanted.",
  client:"Your target audience is who you are actually trying to attract. Your signals invite whoever shows up, so it pays to choose them on purpose.",
  aliases:["target audience","audience","ideal customer","who you want to attract"] },

{ id:"c.m2.diagnosis-map", pack:"m2", name:"The diagnosis map",
  plain:"Reading a symptom a business owner describes back to its real cause, instead of taking the stated complaint at face value.",
  example:"Customers always haggling on price sounds like a pricing problem, but it usually means the business looks interchangeable. That is a positioning problem wearing a price complaint's clothes.",
  client:"When you tell me the symptom, my job is finding the actual cause underneath it. Haggling on price is almost never really about price.",
  aliases:["diagnosis map","reading the symptom","real cause","symptom versus cause"] },

/* ---- m3 · Growth & Marketing ---- */
{ id:"c.m3.funnel", pack:"m3", name:"Funnel",
  plain:"The pipeline a customer moves through: stranger, visitor, lead, then customer, with each stage smaller than the one before it.",
  example:"Two hundred strangers see an ad, thirty visit the site, five become leads, and one actually books. That narrowing path is the funnel.",
  client:"Think of it as a pipeline: strangers, visitors, leads, customers. Every marketing tool exists to fix one specific gap between two of those stages.",
  aliases:["funnel","the pipeline","stranger to customer","marketing pipeline"] },

{ id:"c.m3.lead", pack:"m3", name:"Lead",
  plain:"A person who raised their hand and left a way to be reached, unlike someone who simply liked a post and moved on.",
  example:"Ten thousand followers cannot be messaged individually, but forty people who DMed a keyword can. Those forty are leads.",
  client:"A lead is someone who raised their hand and gave you a way to reach them. That is worth more than any number of followers.",
  aliases:["lead","raised their hand","someone who reached out","potential customer"] },

{ id:"c.m3.lead-magnet", pack:"m3", name:"Lead magnet",
  plain:"Something genuinely useful given away for free, designed to make raising a hand easy and low risk.",
  example:"DM the word AUDIT trades one word for a real, useful site review, so the request feels effortless compared to filling out a nine field form.",
  client:"A lead magnet is a free useful thing that starts the conversation. It has to be worth something on its own, even if the person never buys.",
  aliases:["lead magnet","free useful thing","freebie that starts conversation","dm the keyword"] },

{ id:"c.m3.organic", pack:"m3", name:"Organic",
  plain:"Unpaid reach that grows through content, SEO, reviews and word of mouth, and that keeps compounding over time.",
  example:"A year of honest reels and real reviews keeps bringing customers long after the posting stopped, because organic reach works while you sleep.",
  client:"Organic is the garden. It grows slowly, but once it is planted it keeps working for you even on days you do nothing.",
  aliases:["organic","organic reach","unpaid reach","the garden"] },

{ id:"c.m3.paid", pack:"m3", name:"Paid ads",
  plain:"Reach that is bought directly, turned on instantly, adjusted freely, and that stops the moment spending stops.",
  example:"A restaurant runs an ad for a slow Tuesday night and sees bookings within hours, but the flow dries up the instant the ad budget runs out.",
  client:"Paid ads are the faucet. Turn it on and the flow starts immediately, but the second you stop paying, it stops.",
  aliases:["paid ads","ads","the faucet","paid reach"] },

{ id:"c.m3.targeting", pack:"m3", name:"Targeting",
  plain:"Choosing exactly who sees an ad, based on place, age, interests or past behavior, instead of showing it to everyone.",
  example:"An ad for windsurf lessons shown only to people near the beach who already follow watersports pages reaches far more likely customers for far less money.",
  client:"Targeting means your ad only shows to the right people, so you stop paying to reach people who were never going to book anyway.",
  aliases:["targeting","who sees the ad","ad audience","showing it to the right people"] },

{ id:"c.m3.creative", pack:"m3", name:"Creative",
  plain:"The actual ad someone sees: the image or video, plus the words attached to it.",
  example:"Two ads with identical targeting and budget can perform completely differently, because one creative actually stops the scroll and the other does not.",
  client:"The creative is the ad itself, the image or video people actually see. Even perfect targeting cannot save a boring creative.",
  aliases:["creative","the ad itself","ad creative","image or video"] },

{ id:"c.m3.remarketing", pack:"m3", name:"Remarketing",
  plain:"Ads shown only to people who already visited before, which makes them cheap and unusually effective.",
  example:"A tourist looks at kite surf lessons and leaves. Days later an ad asking still thinking about it appears, aimed only at her because she already showed interest.",
  client:"Remarketing only shows ads to people who already looked once. It costs less and works better because you are nudging warm interest, not starting cold.",
  aliases:["remarketing","retargeting","ads that follow you","showing ads to past visitors"] },

{ id:"c.m3.conversion-rate", pack:"m3", name:"Conversion rate",
  plain:"The percentage of people who take the step you wanted, like visitors who book or leads who actually buy.",
  example:"If a hundred people visit and four book, the conversion rate is four percent, and that single number tells you whether the page is doing its job.",
  client:"Conversion rate is how many lookers actually become bookers. It is the one number that tells you if a page is working, not just getting traffic.",
  aliases:["conversion rate","percentage that books","lookers to bookers","how many convert"] },

{ id:"c.m3.reach", pack:"m3", name:"Reach",
  plain:"How many different people saw something, counted separately from impressions, which count every view including repeats.",
  example:"A post reaching two thousand people but only getting five messages shows plenty of eyeballs and almost no actual interest.",
  client:"Reach is just how many eyeballs saw it. It feels good, but it does not pay the bills by itself.",
  aliases:["reach","impressions","how many people saw it","eyeballs"] },

{ id:"c.m3.engagement", pack:"m3", name:"Engagement",
  plain:"Likes, comments, shares and saves. Real interaction, but not the same thing as income.",
  example:"A reel gets four hundred likes and zero bookings. The engagement was real, the applause was real, but none of it paid a single invoice.",
  client:"Engagement is applause, and applause is nice, but applause alone does not book you a single customer.",
  aliases:["engagement","likes and comments","applause","social interaction"] },

{ id:"c.m3.algorithm", pack:"m3", name:"Algorithm",
  plain:"The platform's own sorting system, deciding whose content gets shown to whom, and how often.",
  example:"Two nearly identical posts get wildly different reach because the algorithm decided to show one to far more people than the other, for reasons nobody outside the platform fully knows.",
  client:"The algorithm is the platform deciding who sees you. It is out of your control, which is exactly why owning your own list matters.",
  aliases:["algorithm","the platform deciding","sorting system","what the algorithm shows"] },

{ id:"c.m3.crm", pack:"m3", name:"CRM",
  plain:"The system that holds every customer, lead and conversation in one place, so nobody has to remember it all by memory.",
  example:"Without a CRM, last month's almost-booked customer and last year's loved-it customer both quietly vanish, because nobody wrote either of them down anywhere.",
  client:"A CRM is the memory of your business. It makes remembering a customer nobody's job and everybody's result.",
  aliases:["crm","customer memory","the customer list","follow up system"] },

{ id:"c.m3.acquisition", pack:"m3", name:"Acquisition",
  plain:"Everything spent, in money and effort, to gain exactly one new customer.",
  example:"If a hundred euros of ads brings in five new bookings, the acquisition cost is twenty euros per customer, and that number should be compared against what each customer is worth.",
  client:"Acquisition is what a new customer actually costs you, once you count everything spent to get them. It is worth knowing that number honestly.",
  aliases:["acquisition","cost per customer","what a customer costs","customer acquisition"] },

{ id:"c.m3.retention", pack:"m3", name:"Retention",
  plain:"Keeping existing customers and selling to them again, instead of only chasing brand new ones.",
  example:"A gym signs up new members every January while half of last year's members quietly quit by March, and nobody ever tried to keep them.",
  client:"Retention means keeping the customers you already won. It is almost always cheaper than finding brand new ones from scratch.",
  aliases:["retention","keeping customers","repeat customers","winning back"] },

{ id:"c.m3.garden-faucet", pack:"m3", name:"The garden and the faucet",
  plain:"The contrast between marketing that compounds slowly like a garden, and marketing that stops the instant you stop paying, like a faucet.",
  example:"Ads bring bookings within hours but dry up the moment the budget stops. Reviews and content take months to grow, then keep working on their own, even while you sleep.",
  client:"Ads are a faucet: it flows while you pay, and stops the second you stop. Content and reviews are a garden: slow to grow, but it keeps working on its own once it does.",
  aliases:["garden and faucet","garden versus faucet","ads versus content","compounding versus stops when you stop"] },

/* ---- m4 · AI and Education ---- */
{ id:"c.m4.ai", pack:"m4", name:"Artificial intelligence",
  plain:"Software that handles tasks needing judgment, not just fixed steps: reading, writing, sorting and deciding.",
  example:"An inbox that used to need a person reading each email and deciding where it goes now gets sorted by AI reading the content itself.",
  client:"AI is software that can read and decide, not just follow a script. That is the whole difference from an ordinary computer program.",
  aliases:["ai","artificial intelligence"] },

{ id:"c.m4.llm", pack:"m4", name:"LLM",
  plain:"The engine behind most AI tools: software trained on huge amounts of text so it can continue any text sensibly.",
  example:"Ask it to write a booking confirmation and it produces one instantly, because it has read millions of emails like it before.",
  client:"Think of the model as the engine. ChatGPT, Claude and Gemini are just different brands built on that kind of engine.",
  aliases:["llm","language model","the model","the engine"] },

{ id:"c.m4.assistants", pack:"m4", name:"Assistant",
  plain:"AI that actually performs a task the moment you ask it to, one request at a time, rather than only talking about it.",
  example:"Ask it to draft five reply emails to common questions and it writes all five, ready for you to check and send.",
  client:"An assistant does the task the moment you ask, instead of just describing how you might do it yourself.",
  aliases:["assistant","assistants","does the task","on request"] },

{ id:"c.m4.prompt", pack:"m4", name:"Prompt",
  plain:"The instruction you give the AI. Vague instructions get vague answers, clear instructions get useful ones.",
  example:"Write something for our newsletter gets generic filler. Write a three line reminder about Friday happy hour, in our usual playful tone gets something usable.",
  client:"The prompt is your briefing to it. Brief it the way you would brief a new hire and the answers get better fast.",
  aliases:["prompt","the instruction","what you type","the briefing"] },

{ id:"c.m4.context", pack:"m4", name:"Context",
  plain:"Everything the model can currently see: the conversation so far and whatever documents or data you have fed it.",
  example:"Paste last month's price list into the chat first, and suddenly the AI quotes real prices instead of guessing at a typical industry rate.",
  client:"Context is its short term memory. Feed it your real prices and rules, and it stops guessing and starts quoting your business.",
  aliases:["context","short term memory","what it can see","what you fed it"] },

{ id:"c.m4.hallucination", pack:"m4", name:"Hallucination",
  plain:"A confident, false statement produced by the AI, because sounding plausible is not the same thing as being true.",
  example:"Asked for a client's phone number it does not actually have, the AI invents one that looks correct and states it without hesitation.",
  client:"It sometimes says nonsense with full confidence, like a friend who never admits not knowing. That is why a person checks before anything ships.",
  aliases:["hallucination","hallucinate","confident nonsense","made up answer"] },

{ id:"c.m4.chatbot", pack:"m4", name:"Chatbot",
  plain:"AI stuck inside a chat window, that answers questions and does nothing beyond talking.",
  example:"A website chatbot can explain your opening hours all day, but it cannot actually book the table for the visitor.",
  client:"A chatbot is a receptionist that can only talk. It cannot pick up a task and carry it through for you.",
  aliases:["chatbot","chat window","the bot","talks only"] },

{ id:"c.m4.agent", pack:"m4", name:"Agent",
  plain:"AI that takes several steps on its own, using tools along the way, and brings you a finished result to approve.",
  example:"Ask it to sort out a booking and it checks the calendar, drafts the confirmation and prepares the email, then waits for your one tap yes.",
  client:"An agent does the legwork itself and brings you the result to sign off on, instead of you doing each step by hand.",
  aliases:["agent","does the legwork","takes steps","brings you the result"] },

{ id:"c.m4.ai-workflow", pack:"m4", name:"AI workflow",
  plain:"A fixed chain of steps where AI handles some stations and plain rules handle the rest, like an assembly line.",
  example:"A new booking triggers a rule that files it, then AI drafts the reply, then a rule sends it once a person approves.",
  client:"Picture an assembly line with AI working at a couple of the stations and simple rules running the others.",
  aliases:["ai workflow","assembly line","fixed chain","stations"] },

{ id:"c.m4.human-loop", pack:"m4", name:"Human in the loop",
  plain:"A setup where a real person approves the result before anything reaches a customer. The professional standard for using AI.",
  example:"The AI drafts the customer reply, but nothing sends until a staff member reads it and taps approve.",
  client:"The machine does the preparing, you keep the yes. Nothing customer facing goes out without your eyes on it first.",
  aliases:["human in the loop","keep the yes","approval step","review before sending"] },

{ id:"c.m4.grounding", pack:"m4", name:"Grounding",
  plain:"Connecting the AI to a business's real data, like prices and rules, so its answers come from facts instead of guesses.",
  example:"Once the AI is grounded in the actual price list, it stops quoting a competitor's typical rate and starts quoting the real one.",
  client:"Grounding means giving it your real prices and rules to quote from, instead of letting it guess at the industry average.",
  aliases:["grounding","grounded","real data","your real prices"] },

{ id:"c.m4.training", pack:"m4", name:"Training",
  plain:"How a model actually learned: patterns pulled from a huge pile of text, fixed once and for all when it was built.",
  example:"The model learned general writing patterns from the internet long before it ever saw your business, so it knows nothing about you until you tell it.",
  client:"Training is what it learned in school, before it ever met you. Everything specific to your business still has to be taught.",
  aliases:["training","how it learned","learned from text","fixed at build time"] },

{ id:"c.m4.fast-junior", pack:"m4", name:"The fast junior",
  plain:"The way to think about an AI model: fast and tireless like a junior assistant, and wrong with the same confidence a senior would have.",
  example:"It drafts ten replies in a minute without complaint, and one of them confidently states the wrong price, so someone still has to check the batch.",
  client:"Think of it as a very fast, well read junior employee with infinite patience and no judgment of its own. You do not marvel at it, you manage it: clear instructions, review before anything ships.",
  aliases:["fast junior","junior employee","fast and tireless","manage it"] },

/* ---- m5 · Systems and Software ---- */
{ id:"c.m5.database", pack:"m5", name:"Database",
  plain:"The structured filing cabinet where all the business's real data actually lives, with rules that keep it consistent.",
  example:"A booking must have a date and a scooter, and the database simply refuses to save one without both, unlike a blank spreadsheet cell.",
  client:"A database is one list that is always right, because it enforces its own rules instead of trusting people to type carefully.",
  aliases:["database","the filing cabinet","one list","data storage"] },

{ id:"c.m5.backend", pack:"m5", name:"Backend",
  plain:"The rules layer behind the scenes: the logic that decides what happens when a booking, payment or date event fires.",
  example:"When a payment lands, the backend is what marks the booking paid and queues the confirmation email, with nobody clicking anything.",
  client:"The backend sits between the database and the screens. It is the rules that fire when something happens, like a payment landing, deciding what happens next before anything reaches a screen.",
  aliases:["backend","back end","the rules layer","what fires on an event"] },

{ id:"c.m5.frontend", pack:"m5", name:"Frontend",
  plain:"The screens people actually touch: the customer facing site and the team's own dashboard.",
  example:"The customer sees a simple booking form, while a staff member across town sees the same booking appear on their dashboard seconds later.",
  client:"The frontend is everything people actually see and touch, whether that person is your customer or your own team.",
  aliases:["frontend","front end","the screens","what people touch"] },

{ id:"c.m5.api", pack:"m5", name:"API",
  plain:"The plug a piece of software exposes so other code can call it directly: ask it a question, hand it an instruction, get structured data back, instead of a person reading a screen and typing what they see.",
  example:"Checking whether a deposit landed can mean opening the bank app every morning, or it can mean the booking system calling the payment provider's API and getting a yes or no back in one request.",
  client:"Before wiring two tools together we check one thing first: does this tool have an API, or is it a closed box? A closed box is a warning sign worth knowing about before you commit to a tool.",
  aliases:["api","closed box","plug or closed box","ask it a question"] },

{ id:"c.m5.webhook", pack:"m5", name:"Webhook",
  plain:"A signal one system sends to another the instant something happens, instead of waiting to be asked.",
  example:"The moment a deposit lands, a webhook pings the booking system directly, rather than someone checking the bank app every hour.",
  client:"A webhook is the doorbell between systems. It rings you the instant something happens instead of you checking and checking.",
  aliases:["webhook","the doorbell","instant ping","event trigger"] },

{ id:"c.m5.integration", pack:"m5", name:"Integration",
  plain:"The finished chain built from an API and a webhook: one event fires, a rule reacts, and data moves from one system into another without a screen or a person in between.",
  example:"A payment lands, a webhook rings the booking system, a backend rule marks the booking paid and queues the confirmation email. Three systems handed the same fact along the chain without anyone retyping it.",
  client:"An integration is not one thing, it is a small chain: an API to plug into, a webhook to ring the doorbell, and a rule on the other end that reacts. Break any link and a person becomes the missing piece again.",
  aliases:["integration","the chain","api plus webhook plus rule","the bridge built from parts"] },

{ id:"c.m5.dashboard", pack:"m5", name:"Dashboard",
  plain:"A screen built to answer one or two specific questions at a glance by pulling live numbers straight from the database, instead of a general purpose view of everything.",
  example:"A good dashboard is built backward from the question an owner actually asks every morning, like how many scooters are out right now, then wired straight to the data that answers exactly that.",
  client:"The test of a good dashboard is simple: does the owner check the screen, or still pick up the phone to ask someone? If they still call, the dashboard is not built to answer the real question yet.",
  aliases:["dashboard","built backward from the question","live numbers","does the owner still call"] },

{ id:"c.m5.back-office", pack:"m5", name:"Back office",
  plain:"The half of the frontend built for the team instead of the customer: the same screens-and-data pattern as the public site, just reading and writing data customers never see.",
  example:"The public booking form and the back office both talk to the same database, but the back office shows every scooter, every payment status and every booking, because the team needs the whole picture, not just one slice of it.",
  client:"The back office usually is not a separate system, it is the other half of the same one: same data, same rules, a different screen built for the people running the business instead of the people booking from it.",
  aliases:["back office","the other half of the frontend","same data different screen"] },

{ id:"c.m5.internal-tool", pack:"m5", name:"Internal tool",
  plain:"Software built only for the team to use, that customers never open or even know exists.",
  example:"A damage checklist app the mechanics fill in after every return never shows up anywhere a customer looks, yet it changes how the business runs.",
  client:"An internal tool is software just for your team. It is invisible to customers and can still change how the whole business runs.",
  aliases:["internal tool","for the team only","invisible to customers","staff only software"] },

{ id:"c.m5.booking-engine", pack:"m5", name:"Booking engine",
  plain:"The core of a reservation system: checking what is available, taking the request, and handling the approval.",
  example:"A customer picks a date, the booking engine checks the scooter is actually free that day, then routes the request to the owner for a tap of approval.",
  client:"The booking engine is the part that knows what is free and takes the ask. Everything else in the system supports that one job.",
  aliases:["booking engine","reservation core","availability and request","the booking core"] },

{ id:"c.m5.realtime", pack:"m5", name:"Real time sync",
  plain:"Every screen showing the same data at the same moment, instead of drifting apart into separate versions.",
  example:"A booking made on the website appears on the counter computer within seconds, so nobody at the counter offers a scooter that just got taken.",
  client:"Real time sync means everyone sees the same thing, instantly. No more two lists quietly disagreeing with each other.",
  aliases:["realtime","real time","sync","instant update"] },

{ id:"c.m5.migration", pack:"m5", name:"Migration",
  plain:"Moving data from an old system into a new one carefully, so none of the history gets lost along the way.",
  example:"Ten years of customer bookings get boxed up, labeled and checked into the new system, the way movers handle a house move.",
  client:"A migration is a house move with professional movers: everything boxed, labeled and checked off at the new place. You do not lose the photo albums.",
  aliases:["migration","moving data","switching systems","data move"] },

{ id:"c.m5.uptime", pack:"m5", name:"Uptime",
  plain:"The share of time a system is actually running and usable, tracked with monitoring rather than just hoped for.",
  example:"A monitoring alert flags the booking system going down at two in the morning, and it gets fixed before a single customer notices.",
  client:"Uptime is how often it is simply working. We know before you do, and there is a fix path ready when something breaks.",
  aliases:["uptime","how often it works","system monitoring","downtime"] },

{ id:"c.m5.backup", pack:"m5", name:"Backup",
  plain:"Automatic copies of the data made regularly, so one bad day cannot wipe out the business's memory.",
  example:"A laptop dies overnight, but because backups run automatically every day, nothing about yesterday's bookings is actually lost.",
  client:"A backup is a spare copy of everything, made automatically. It is the cheapest insurance in the business and it takes an afternoon to set up.",
  aliases:["backup","backups","spare copy","automatic copies"] },

{ id:"c.m5.permissions", pack:"m5", name:"Permissions",
  plain:"The rules deciding who can log in and exactly what each person is allowed to see or change.",
  example:"A part time staff member can see today's bookings but cannot touch pricing, because their permissions only open the doors they need.",
  client:"Permissions are the right keys for the right people. Nobody has to trust everyone with everything just to get their own job done.",
  aliases:["permissions","access","who can log in","the right keys"] },

{ id:"c.m5.cloud", pack:"m5", name:"The cloud",
  plain:"Software and data running on professional servers, reached over the internet instead of stored on one person's own computer.",
  example:"The booking data lives in a guarded data center with continuous backups, not on a laptop that could be stolen or spilled on.",
  client:"The cloud means your data lives on professional computers, not under the counter. That is usually far safer than it sounds.",
  aliases:["cloud","the cloud","professional servers","not on one computer"] },

{ id:"c.m5.three-layers", pack:"m5", name:"The three layers",
  plain:"The idea that any piece of business software is three layers: a place where the data lives, rules that move it, and screens that people touch.",
  example:"A double booking is never bad luck, it is two screens both claiming to be the truth because there is no single place the data actually lives.",
  client:"Every system is three layers: a place data lives, rules that move it, and screens people touch. When a business feels broken, one of the three is missing or doubled.",
  aliases:["three layers","data rules screens","three layer model","a place data lives"] },

/* ---- m6 · The Sales Arena ---- */
{ id:"c.m6.spine", pack:"m6", name:"The conversation spine",
  plain:"The six moves of a good sales conversation, in order: listen, dig, diagnose, translate, recommend, close lite. Mostly listening.",
  example:"A rep spends the first ten minutes only asking questions about the owner's actual Saturdays, before saying one word about a solution.",
  client:"Most of what you will hear from me today is a question, not a pitch. I want to understand your Saturdays before I say anything about a fix.",
  aliases:["conversation spine","six moves","listen dig diagnose","the spine"] },

{ id:"c.m6.two-thirds", pack:"m6", name:"The two thirds ratio",
  plain:"In good discovery, the prospect does about two thirds of the talking. If you are explaining before asking four questions, you are pitching.",
  example:"A rep catches herself explaining the product in minute two, stops, and asks another question instead, because the ratio was already backwards.",
  client:"I would rather hear about your Tuesdays for the next ten minutes than tell you anything about what I do.",
  aliases:["two thirds ratio","two thirds","talk ratio","mostly listening"] },

{ id:"c.m6.insider-question", pack:"m6", name:"The insider question",
  plain:"A question about a specific painful moment that only someone who has actually worked in the business would know to ask about.",
  example:"Asking what happens when someone returns the scooter late and the next renter is already standing there proves you have stood exactly where they stand.",
  client:"When someone returns it late and the next renter is already waiting at the counter, what actually happens?",
  aliases:["insider question","insider proof","the late return question","proof no slide can match"] },

{ id:"c.m6.tuesday-move", pack:"m6", name:"The Tuesday move",
  plain:"When an answer sounds vague, ask what it actually looks like on a normal Tuesday, because the truth lives in the boring, ordinary day.",
  example:"An owner says bookings mostly go fine, and the follow up question about a normal Tuesday reveals three missed messages he had forgotten about.",
  client:"What does mostly fine actually look like on a normal Tuesday for you?",
  aliases:["tuesday move","normal tuesday","the boring tuesday","ask about tuesday"] },

{ id:"c.m6.normalization", pack:"m6", name:"Honest normalization",
  plain:"Telling a prospect honestly that they are not the exception, that almost every business like theirs has the same problem, only when it is actually true.",
  example:"Hearing you are the third rental owner this month who told me exactly this makes an owner relax enough to admit the rest of the story.",
  client:"You are not the exception here. We see this in almost every business your size.",
  aliases:["normalization","honest normalization","not the exception","you are not alone"] },

{ id:"c.m6.reflect-first", pack:"m6", name:"Reflect before recommend",
  plain:"Repeating a prospect's worst moments back to them in their own words before proposing anything, because feeling understood comes before feeling helped.",
  example:"Before mentioning any fix, a rep says so every request runs through your phone, and evenings go to admin, and the May double booking still stings.",
  client:"So every request runs through your phone, evenings go to admin, and the double booking in May still stings. Did I get that right?",
  aliases:["reflect before recommend","reflecting back","repeat it back","feeling understood"] },

{ id:"c.m6.one-recommendation", pack:"m6", name:"One recommendation",
  plain:"Giving one clear recommendation instead of a menu of options, because a menu turns the prospect into the expert and they freeze.",
  example:"Instead of listing five possible fixes, the rep names the one smallest move that clears the biggest bottleneck and stops there.",
  client:"Here is the one thing I would actually do first, and here is why. I am not going to hand you a menu to choose from.",
  aliases:["one recommendation","not a menu","single recommendation","smallest move biggest leak"] },

{ id:"c.m6.close-lite", pack:"m6", name:"Close lite",
  plain:"Ending the conversation with one small, concrete next step tied to a real date, never a vague think about it.",
  example:"The meeting ends with I will send the audit Thursday, and if it looks right we start with the calendar, not a handshake and hope.",
  client:"I will send you the audit by Thursday, and if it looks right, we start with your calendar.",
  aliases:["close lite","concrete next step","a date not a maybe","small close"] },

{ id:"c.m6.story-arc", pack:"m6", name:"Situation, turn, takeaway",
  plain:"A thirty second story shape: situation, turn, takeaway, always ending with a question that hands the moment back to the prospect.",
  example:"An owner used to confirm every booking himself at all hours, then requests started landing on his phone with one tap approval, and he kept every yes while losing the running around. Does any of that sound like your evenings?",
  client:"Let me tell you about one owner in thirty seconds, and you tell me if any of it sounds familiar.",
  aliases:["story arc","situation turn takeaway","the thirty second story","handback question"] },

{ id:"c.m6.translation-rule", pack:"m6", name:"The translation rule",
  plain:"Translating any technical fix into what the client actually cares about: more customers, looking professional, or less hassle. Never sell the technology itself.",
  example:"Instead of explaining an API integration, the rep says your booking and your invoice will finally agree with each other automatically.",
  client:"Forget the tech words. What this actually gets you is fewer double bookings and a Tuesday afternoon back in your week.",
  aliases:["translation rule","translate the fix","what they actually care about","kitchen table language"] },

];

function byId(id){ for (var i=0;i<ALL.length;i++){ if (ALL[i].id===id) return ALL[i]; } return null; }
function byPack(p){ return ALL.filter(function(c){ return c.pack===p; }); }
function ids(){ return ALL.map(function(c){ return c.id; }); }
function findInText(text){
  var n = " " + U.norm(text) + " ";
  return ALL.filter(function(c){
    return c.aliases.some(function(a){ return n.indexOf(" " + U.norm(a) + " ") >= 0; });
  });
}

root.SA_CONCEPTS = { ALL:ALL, byId:byId, byPack:byPack, ids:ids, findInText:findInText };
})(typeof window !== "undefined" ? window : global);

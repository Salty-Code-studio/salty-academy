// Salty Academy game data · part 6: M7 On Camera, Episode 1.
// A bonus pack: it has its own mastery round but sits outside the three finals.
// Same schemas as data1-5, all in one pack object so the module is self-contained.
window.ACADEMY_PART2 = window.ACADEMY_PART2 || [];
window.ACADEMY_PART2.push({
  id: "m7", num: "M7", title: "On Camera: Episode 1", icon: "🎬", bonus: true,
  read: "modules/academy-module-7.html",
  idea: "Name his Tuesday. Show the fix. Say one true thing at a time. Then ask once.",

  cards: [
    {id:"f.m7.promise.a", c:["c.m7.promise"], t:"The episode promise", d:"Big companies always had their own software. Now a 44-scooter rental has it too.", s:"enterprise software, small-business size"},
    {id:"f.m7.one-problem.a", c:["c.m7.one-problem"], t:"One problem", d:"Episode 1 is only: who has which scooter, and who paid?", s:"today is about one thing"},
    {id:"f.m7.owner-tuesday.a", c:["c.m7.owner-tuesday"], t:"The owner's Tuesday", d:"Specific everyday moments only insiders know. Naming them is proof.", s:"answering bookings from bed"},
    {id:"f.m7.name-moment.a", c:["c.m7.name-moment"], t:"Name the moment", d:"One concrete scene beats a label like 'admin problems'.", s:"scrolling back to check March"},
    {id:"f.m7.three-costs.a", c:["c.m7.three-costs"], t:"Three costs", d:"Time, money, reputation. One line each.", s:"hours, cash and your name"},
    {id:"f.m7.maths-out-loud.a", c:["c.m7.maths-out-loud"], t:"Maths out loud", d:"Hours a week × € per hour × 52. Say the number. Let it sit.", s:"6,500 a year, for a spreadsheet"},
    {id:"f.m7.respect-old-way.a", c:["c.m7.respect-old-way"], t:"Respect the old way", d:"Never mock the spreadsheet. The viewer uses the same one.", s:"this worked, until it didn't"},
    {id:"f.m7.the-fix.a", c:["c.m7.the-fix"], t:"The board", d:"Every scooter, every day, one screen. Unpaid shows red and striped.", s:"red means chase"},
    {id:"f.m7.the-fix.b", c:["c.m7.the-fix"], t:"Paid until", d:"One date per rental. Student pays another month? Tap +1 month.", s:"one date tells you"},
    {id:"f.m7.the-fix.c", c:["c.m7.the-fix"], t:"The phone gate", d:"New booking pings Sjonnie on Telegram. Confirm or decline.", s:"you stay the boss, from the beach"},
    {id:"f.m7.show-then-say.a", c:["c.m7.show-then-say"], t:"Show, then say", d:"Screen first. Claim second, or no claim at all.", s:"let me just show you"},
    {id:"f.m7.admit-mistake.a", c:["c.m7.admit-mistake"], t:"The mistake story", d:"We thought his sheets were empty from December. The format had changed. We caught it.", s:"honestly, we got this wrong first"},
    {id:"f.m7.restraint.a", c:["c.m7.restraint"], t:"Restraint", d:"No online payments, because island customers pay at the desk.", s:"we built for how you work"},
    {id:"f.m7.the-shift.a", c:["c.m7.the-shift"], t:"The shift", d:"Big chains always had this. AI made it affordable for a shop.", s:"enterprise money, now fits your shop"},
    {id:"f.m7.one-ask.a", c:["c.m7.one-ask"], t:"One ask", d:"Got this problem? Message us. Nothing stacked on top.", s:"send us a message"},
    {id:"f.m7.human-moment.a", c:["c.m7.human-moment"], t:"Human moment", d:"30 to 60 seconds at the end. A passion, shown not explained.", s:"just show it"},
    {id:"f.m7.keep-the-promise.a", c:["c.m7.keep-the-promise"], t:"Keep the promise", d:"First sentence repeats the title's promise. No hello, no intro.", s:"by the end you'll see"},
    {id:"f.m7.true-numbers.a", c:["c.m7.true-numbers"], t:"True numbers", d:"Specific and real. Client money only with the client's OK.", s:"more than he expected"}
  ],

  quiz: [
    {id:"q.m7.promise.a", c:["c.m7.promise"], q:"A friend asks what your first episode is about. Best one-line answer?", a:["Big-company software in a scooter shop","How we code booking apps in general","Everything about running a rental business","Why AI is about to change everything"], why:"The promise is the whole channel in one line: what big companies had, a small shop now has."},
    {id:"q.m7.one-problem.a", c:["c.m7.one-problem"], q:"Mid-filming you start explaining Sjonnie's Google ranking. What do you do?", a:["Stop. That's another episode","Keep going, it's useful","Add it as a bonus segment","Mention it quickly then return"], why:"One problem per episode. A second problem is the next video, not a detour in this one."},
    {id:"q.m7.owner-tuesday.a", c:["c.m7.owner-tuesday"], q:"Which line proves you've actually been inside a rental business?", a:["You answer bookings from bed, right?","Rental businesses face many challenges","Admin can be time consuming","Software improves efficiency"], why:"The insider moment carries the proof. Generic lines could come from anyone."},
    {id:"q.m7.name-moment.a", c:["c.m7.name-moment"], q:"You want the viewer to feel the pain. Which hits hardest?", a:["Scrolling back at night to check March","Payment tracking is quite inefficient","Admin takes up a lot of your time","Spreadsheets are outdated and slow"], why:"A scene the viewer has lived beats a category every time."},
    {id:"q.m7.three-costs.a", c:["c.m7.three-costs"], q:"'Tourists don't remember the scooter. They remember the wait.' Which cost is that?", a:["Reputation","Time","Money","Fleet maintenance"], why:"Slow replies and counter mix-ups cost your name, which costs the next booking."},
    {id:"q.m7.three-costs.b", c:["c.m7.three-costs"], q:"Rentals that ran for weeks unpaid and nobody noticed. Which cost?", a:["Money","Reputation","Time","Fleet wear"], why:"'The money isn't lost. It's just not in your pocket.'"},
    {id:"q.m7.maths-out-loud.a", c:["c.m7.maths-out-loud"], q:"Sjonnie spends 5 hours a week on it, at 25 euros an hour. The yearly cost?", a:["6,500 euros","1,300 euros","500 euros","12,000 euros"], why:"5 × 25 × 52 = 6,500. Say it, then stop talking."},
    {id:"q.m7.maths-out-loud.b", c:["c.m7.maths-out-loud"], q:"You've just said the yearly number on camera. What's next?", a:["Pause. Let it sit","Explain the formula again","Quickly move to the next point","Round it up to sound bigger"], why:"The number is the drama. Explaining it twice kills it."},
    {id:"q.m7.respect-old-way.a", c:["c.m7.respect-old-way"], q:"Showing his old coloured spreadsheet, what's the right tone?", a:["'This worked. Until it didn't.'","'Look at this mess, haha'","'Nobody should still be doing this'","'This is so outdated'"], why:"The viewer uses the same spreadsheet. Laugh at it and you laugh at him."},
    {id:"q.m7.respect-old-way.b", c:["c.m7.respect-old-way"], q:"Why say 'every rental we've met runs like this'?", a:["It removes the shame","It sounds more professional","It makes us seem busy","It fills an awkward silence"], why:"Shame closes people. Normal opens them."},
    {id:"q.m7.the-fix.a", c:["c.m7.the-fix"], q:"In the fix segment, what do you show first?", a:["The board, the big picture","The login screen and password","The settings page","How the code works underneath"], why:"Board first gives the viewer the map. Then the details make sense."},
    {id:"q.m7.the-fix.b", c:["c.m7.the-fix"], q:"A student pays another month at the desk. What does Sjonnie do?", a:["Tap +1 month","Recolour the spreadsheet cell","Send a WhatsApp to himself","Write it in a notebook"], why:"Paid until is one date. One tap moves it."},
    {id:"q.m7.the-fix.c", c:["c.m7.the-fix"], q:"How many features should the fix segment show?", a:["Three, one per pain","Every button, to look thorough","Just one","As many as time allows"], why:"Show the three things that kill the three pains. Then stop."},
    {id:"q.m7.show-then-say.a", c:["c.m7.show-then-say"], q:"Which builds more trust on camera?", a:["The red bar appearing on screen","'Our system is incredibly powerful'","'Clients love this feature'","'It's the best on the market'"], why:"Show, then say. Or don't say at all."},
    {id:"q.m7.admit-mistake.a", c:["c.m7.admit-mistake"], q:"Why tell the story of misreading Sjonnie's sheets?", a:["It makes the rest believable","To look humble for the algorithm","To fill time in the middle","It's funny and lightens the mood"], why:"Perfect sounds like a sales pitch. Honest sounds like a partner."},
    {id:"q.m7.restraint.a", c:["c.m7.restraint"], q:"Monischa asks: 'Why no online payments?' Best answer?", a:["His customers pay at the desk","We ran out of time to build it","Payments are too complicated","He didn't want to pay extra"], why:"Building for how the shop really works is expertise. Say it plainly."},
    {id:"q.m7.the-shift.a", c:["c.m7.the-shift"], q:"How long should 'the shift' segment about AI be?", a:["About a minute","Ten minutes, it's important","Skip it entirely","The whole second half"], why:"Zoom out once, briefly. An AI lecture loses the owner."},
    {id:"q.m7.one-ask.a", c:["c.m7.one-ask"], q:"Which ending fits the episode?", a:["'Got this problem? Message us.'","'Like, subscribe, follow and call us'","'Check our website and Instagram'","'Smash that bell, guys'"], why:"One ask. Stacked asks get none."},
    {id:"q.m7.human-moment.a", c:["c.m7.human-moment"], q:"Where does the drift clip go?", a:["At the very end","In the first 30 seconds","In the middle of the fix","Nowhere, it's off topic"], why:"Business viewers stay for the problem. People who stay to the end get to meet you."},
    {id:"q.m7.keep-the-promise.a", c:["c.m7.keep-the-promise"], q:"Title: 'How a 44-scooter rental knows who paid'. Your first line?", a:["Something about who paid","Hi, I'm Rudo, welcome","Let me tell you about us","Don't forget to subscribe"], why:"The first sentence keeps the title's promise. Earn the intro later."},
    {id:"q.m7.true-numbers.a", c:["c.m7.true-numbers"], q:"Sjonnie hasn't OK'd sharing the unpaid amount. What do you say?", a:["'More than he expected'","The exact amount anyway","A rounded-up estimate","Nothing about it at all"], why:"The moment still lands without the figure. His money is his to share."},
    {id:"q.m7.true-numbers.b", c:["c.m7.true-numbers"], q:"Which line sounds most like an expert?", a:["'44 scooters, one screen'","'A really large fleet'","'Tons of bookings'","'Massive efficiency gains'"], why:"Specific beats impressive."}
  ],

  translate: [
    {id:"t.m7.the-fix.a", c:["c.m7.the-fix"], setup:"Explain the board to an owner who hates computers.", a:["Every scooter on one screen. Red means chase.","A centralised fleet management dashboard.","A real-time database view of your inventory."], why:"Red means chase. He can picture that without knowing what a database is."},
    {id:"t.m7.the-fix.b", c:["c.m7.the-fix"], setup:"Explain the Telegram approval to Sjonnie's wife.", a:["New bookings wait for his yes, on his phone.","A webhook-based approval workflow integration.","An automated booking confirmation pipeline."], why:"Kitchen table version: he stays the boss, wherever he is."},
    {id:"t.m7.the-shift.a", c:["c.m7.the-shift"], setup:"Explain why custom software is affordable now.", a:["Big chains always had it. AI made it fit a shop.","AI-assisted development reduces engineering cost.","LLMs accelerate the software lifecycle."], why:"The comparison does the work: what Hertz had, you can have."},
    {id:"t.m7.promise.a", c:["c.m7.promise"], setup:"Tell a stranger at a party what your channel is.", a:["We show small shops running on big-company software.","A tech channel about custom SaaS solutions.","Content about digital transformation for SMEs."], why:"A stranger should be able to repeat it to someone else."},
    {id:"t.m7.maths-out-loud.a", c:["c.m7.maths-out-loud"], setup:"Make 5 hours a week feel real to an owner.", a:["That's 6,500 a year. For checking a spreadsheet.","That's significant operational overhead.","That's roughly 12.5% of a full-time workweek."], why:"Euros per year, then what it's spent on. The contrast stings."},
    {id:"t.m7.restraint.a", c:["c.m7.restraint"], setup:"Explain why the system has no online payment.", a:["His customers pay at the counter. So we built that.","Payment gateway integration was out of scope.","Stripe isn't optimised for this region yet."], why:"Restraint, said simply, sounds like you understand his business."}
  ],

  diagnose: [
    {id:"d.m7.one-problem.a", c:["c.m7.one-problem"], say:"Monischa watches the rough cut: 'I lost track of what this video was about.'", a:["Too many problems in one episode","The video is too short","Not enough screen recording"], why:"Two problems make a muddle. One problem makes a promise."},
    {id:"d.m7.respect-old-way.a", c:["c.m7.respect-old-way"], say:"A rental owner comments: 'Bit rude about spreadsheets, I use one.'", a:["We mocked the old way","He's just not our audience","The thumbnail was misleading"], why:"The viewer is the spreadsheet owner. Respect it or lose him."},
    {id:"d.m7.keep-the-promise.a", c:["c.m7.keep-the-promise"], say:"Analytics: half the viewers gone by second 20.", a:["The opening broke the title's promise","The video is too long","The thumbnail is too bright"], why:"Early drop-off means the first lines didn't deliver what the title promised."},
    {id:"d.m7.show-then-say.a", c:["c.m7.show-then-say"], say:"A viewer: 'Sounds nice, but I didn't see it actually work.'", a:["Claims without showing it","Too much screen time","Bad audio quality"], why:"Show it working at the real desk. Then the claim is just a caption."},
    {id:"d.m7.one-ask.a", c:["c.m7.one-ask"], say:"Lots of views, zero messages from owners.", a:["Too many asks, or none clear","Wrong upload day","Video needs more music"], why:"One clear ask: got this problem, message us. Stacked asks get ignored."},
    {id:"d.m7.true-numbers.a", c:["c.m7.true-numbers"], say:"Comment: 'Massive results, huge gains... sounds like every agency.'", a:["Vague hype instead of real numbers","Not enough results shown","Too humble in tone"], why:"'44 scooters, same day' sounds true. 'Massive' sounds like sales."}
  ],

  speak: [
    {id:"s.m7.promise.a", c:["c.m7.promise","c.m7.the-shift"], prompt:"Say the promise of the episode", words:["Big companies","Scooter shop","Now"], points:[
      "Big rental chains always had their own software.",
      "It cost a fortune, so small shops made do with spreadsheets.",
      "Now a 44-scooter rental on Bonaire runs on its own system.",
      "This used to cost enterprise money. Now it fits your shop."]},
    {id:"s.m7.owner-tuesday.a", c:["c.m7.owner-tuesday","c.m7.name-moment"], prompt:"Describe a rental owner's Tuesday", words:["Bed","Spreadsheet","March"], points:[
      "A booking comes in at 11 at night. He answers from bed.",
      "Red cells unpaid, green paid, orange in the shop. All by hand.",
      "A student rents for months. Was March paid? He scrolls back.",
      "It works. Mostly. And he's tired."]},
    {id:"s.m7.three-costs.a", c:["c.m7.three-costs","c.m7.maths-out-loud"], prompt:"Cost the problem three ways", words:["Hours","Pocket","Wait"], points:[
      "Time: a part-time job nobody is paying you for.",
      "Money: it isn't lost, it's just not in your pocket.",
      "Reputation: tourists remember the wait, not the scooter.",
      "Then the maths: 5 hours × 25 euros × 52 is 6,500 a year."]},
    {id:"s.m7.the-fix.a", c:["c.m7.the-fix","c.m7.show-then-say"], prompt:"Walk through the fix", words:["Board","Paid until","Phone"], points:[
      "The board: every scooter, every day, one screen.",
      "Unpaid turns red and striped. You see it without looking.",
      "Paid until: one date. Another month paid? Tap +1 month.",
      "New booking pings his phone on Telegram. Confirm or decline."]},
    {id:"s.m7.admit-mistake.a", c:["c.m7.admit-mistake"], prompt:"Tell the mistake story", words:["December","Format","Caught"], points:[
      "We imported Sjonnie's old sheets, back to February 2025.",
      "At first we thought they were empty from December.",
      "They weren't. The format had changed in the new sheets.",
      "We caught it, fixed it, and nothing was lost."]},
    {id:"s.m7.restraint.a", c:["c.m7.restraint"], prompt:"Answer: 'Why no online payments?'", words:["Counter","Island","Built"], points:[
      "His customers pay at the counter.",
      "That's how island rentals work.",
      "So we built the system that way.",
      "We build for how you work, not how software wants you to."]},
    {id:"s.m7.the-shift.a", c:["c.m7.the-shift"], prompt:"Explain the shift in under 30 seconds", words:["Hertz","Fortune","Now"], points:[
      "Hertz always had a fleet system built for them.",
      "That cost a fortune. Small shops never had a chance.",
      "AI made building software much cheaper.",
      "Now it fits a 44-scooter shop."]},
    {id:"s.m7.one-ask.a", c:["c.m7.one-ask","c.m7.human-moment"], prompt:"Close the episode", words:["Problem","Message","Stop"], points:[
      "Got this problem? Send us a message.",
      "The bottleneck calculator is in the description.",
      "Then stop talking. No stacked asks.",
      "Cut to the human moment. Show it, don't explain it."]}
  ],

  open: [
    { id:"o.m7.name-moment.a", c:["c.m7.name-moment","c.m7.owner-tuesday"], use:"module",
      ask:"Rewrite this line so it hits harder: 'Rental owners struggle with payment tracking.'",
      rubric:{ must:[["night","bed","11","scroll","march","month","spreadsheet","red","notebook","check"]],
               nice:[["student","cell","colour","color","paid"]],
               miss:[{ match:["efficient","efficiency","optimise","optimize","solution"],
                       say:"That's still a category. Name one scene he has actually lived." }],
               minMust:1 },
      model:"It's 11 at night and you're scrolling back through the spreadsheet to see if your student paid March.",
      why:"A specific moment lets him see himself. A category lets him scroll past." },
    { id:"o.m7.three-costs.a", c:["c.m7.three-costs"], use:"module",
      ask:"Monischa asks on camera: 'So what does this actually cost him?' Answer in three short lines.",
      rubric:{ must:[["time","hours","evening","week"],["money","cash","unpaid","pocket","euro"],["reputation","name","tourist","wait","review","customer"]],
               nice:[["52","6,500","6500","year"]],
               miss:[{ match:["stress","annoying","frustrating"],
                       say:"Feelings are real, but cost it: time, money and reputation, one line each." }],
               minMust:2 },
      model:"Hours every week he isn't paid for. Money that ran unpaid and nobody noticed. And tourists who remember the wait, not the scooter.",
      why:"Three costs, three lines. The viewer picks the one that hurts him most." },
    { id:"o.m7.restraint.a", c:["c.m7.restraint","c.m7.admit-mistake"], use:"module",
      ask:"A viewer comments: 'Why didn't you add online payments? Seems basic.' Reply in two sentences.",
      rubric:{ must:[["desk","counter","cash","in person","pickup"]],
               nice:[["island","how he works","built","his customers"]],
               miss:[{ match:["sorry","later","forgot","time"],
                       say:"It wasn't an oversight. It was a choice. Say why." }],
               minMust:1 },
      model:"His customers pay at the counter, so that's how we built it. We build for how the shop actually works, and we can add online payments the day he needs them.",
      why:"Restraint, explained, reads as expertise instead of a missing feature." }
  ],

  match: [
    { id:"x.m7.the-fix.a", c:["c.m7.the-fix","c.m7.three-costs","c.m7.one-ask","c.m7.human-moment"], use:"module",
      ask:"Match each moment of the episode to what it is there to do.",
      pairs:[ {l:"Scrolling back to check March", r:"Make the pain clear"},
              {l:"The red NOT PAID bar", r:"Show the fix"},
              {l:"'Got this problem? Message us.'", r:"The one ask"},
              {l:"The drift clip at the end", r:"Let them meet you"} ],
      why:"Every beat has one job. Knowing the job is what lets you talk without a script." }
  ]
});

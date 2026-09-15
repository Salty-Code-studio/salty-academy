/* Salty Academy data · open-answer and matching items. Task 13 fills in the rest. */
window.ACADEMY_OPEN = {
  p1: [
    { id:"o.p1.speed.a", c:["c.p1.speed"], use:"module",
      ask:"A cafe owner says her site is fine, it just takes a few seconds. What do you tell her?",
      rubric:{ must:[["slow","seconds","speed","load"],["leave","lose","gone","bounce","back"]],
               nice:[["never","silent","complain","tell you"]],
               miss:[{ match:["google","ranking","seo"],
                       say:"Speed does affect ranking, but the money problem is the visitor who left before the page appeared." }],
               minMust:1 },
      model:"Three seconds of blank screen feels the same as a broken site. Most phone visitors leave, and none of them complain, so she never hears about it.",
      why:"The point is the silence: she cannot see the customers she lost." }
  ],
  p2: [
    { id:"x.p2.bottleneck.a", c:["c.p2.bottleneck","c.p2.workflow"], use:"module",
      ask:"Match each complaint to what is actually broken.",
      pairs:[ {l:"'I retype every booking into the calendar'", r:"Manual entry"},
              {l:"'Nobody knows which list is current'", r:"No single source of truth"},
              {l:"'It only jams on Saturdays'", r:"A bottleneck"} ],
      why:"Each complaint names a symptom, and the match is the real fault behind it." }
  ]
};

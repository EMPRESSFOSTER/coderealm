export interface ValidationResult {
  passed: boolean;
  score: number;
  feedback: string[];
  corrections?: string[];
}

export interface Level {
  id: number;
  title: string;
  objective: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Boss";
  xpReward: number;
  instructions: string[];
  initialHtml: string;
  initialCss: string;
  initialJs: string;
  validation: (html: string, css: string, js: string) => ValidationResult;
  hints: string[];
}

export const levels: Record<string, Level> = {
  "1": {
    id: 1,
    title: "HTML Survival",
    objective: "Fix the broken profile card structure.",
    description: "Fix broken tags and master semantic structure in this initial trial.",
    difficulty: "Easy",
    xpReward: 250,
    instructions: [
      "Add the missing closing tags for the main container.",
      "Fix the nesting of the h1 and p tags.",
      "Use semantic HTML (<article> instead of <div>).",
      "Add an alt attribute to the image tag."
    ],
    initialHtml: `<article class="card">
  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop">
  <h1>Senior Developer
  <p>Helping others learn code
  <button>Contact
</article>`,
    initialCss: `.card { 
  border: 1px solid #333; 
  padding: 20px; 
  border-radius: 12px; 
  width: 300px; 
  background: #1a1a24;
  color: white;
  text-align: center;
}
img { border-radius: 50%; margin-bottom: 1rem; border: 2px solid #00f3ff; }
h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
p { color: #888; margin-bottom: 1.5rem; }
button { background: #00f3ff; color: black; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer; }`,
    initialJs: `console.log("Card initialized!");`,
    validation: (html, css, js) => {
      const feedback = [];
      const corrections = [];
      let score = 0;

      const cleanHtml = html.toLowerCase().replace(/\s+/g, '');

      if (cleanHtml.includes("<article") && cleanHtml.includes("</article>")) {
        score += 25;
        feedback.push("✅ Semantic container (<article>) used correctly.");
      } else {
        corrections.push("Use an <article> tag to wrap your profile card.");
      }

      if (cleanHtml.includes("</h1>") && cleanHtml.includes("</p>") && cleanHtml.includes("</button>")) {
        score += 25;
        feedback.push("✅ All text elements correctly closed.");
      } else {
        corrections.push("Some tags (h1, p, button) are missing their closing tags.");
      }

      if (cleanHtml.includes("alt=")) {
        score += 25;
        feedback.push("✅ Accessibility: Image has an alt attribute.");
      } else {
        corrections.push("The <img> tag is missing an 'alt' attribute for accessibility.");
      }

      if (score === 75) {
        score = 100; // Bonus for completion
        feedback.push("🌟 Perfect structure!");
      }

      return {
        passed: score >= 75,
        score,
        feedback,
        corrections
      };
    },
    hints: [
      "Check if every opening tag like <h1> has a corresponding </h1>.",
      "The <img> tag should have an alt attribute for accessibility.",
      "Make sure <article> wraps all other elements."
    ]
  },
  "2": {
    id: 2,
    title: "CSS Warrior",
    objective: "Center the glowing core using Flexbox.",
    description: "Flexbox puzzles and grid layouts. Master the art of positioning.",
    difficulty: "Easy",
    xpReward: 500,
    instructions: [
      "Set the display property of .container to flex.",
      "Use justify-content to center horizontally.",
      "Use align-items to center vertically.",
      "Give the .core a neon cyan box-shadow."
    ],
    initialHtml: `<div class="container">
  <div class="core"></div>
</div>`,
    initialCss: `.container {
  height: 300px;
  width: 100%;
  background: #050508;
  border: 1px dashed #333;
}

.core {
  width: 80px;
  height: 80px;
  background: #00f3ff;
  border-radius: 50%;
}`,
    initialJs: ``,
    validation: (html, css, js) => {
      const feedback = [];
      const corrections = [];
      let score = 0;
      
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();

      if (cleanCss.includes("display:flex")) {
        score += 25;
        feedback.push("✅ Flexbox initiated.");
      } else {
        corrections.push("The container needs 'display: flex'.");
      }

      if (cleanCss.includes("justify-content:center")) {
        score += 25;
        feedback.push("✅ Horizontal centering achieved.");
      } else {
        corrections.push("Use 'justify-content: center' to align the core horizontally.");
      }

      if (cleanCss.includes("align-items:center")) {
        score += 25;
        feedback.push("✅ Vertical centering achieved.");
      } else {
        corrections.push("Use 'align-items: center' to align the core vertically.");
      }

      if (cleanCss.includes("box-shadow:") && cleanCss.includes("#00f3ff")) {
        score += 25;
        feedback.push("✅ Neon glow stabilized.");
      } else {
        corrections.push("The core needs a box-shadow with color #00f3ff.");
      }

      return {
        passed: score === 100,
        score,
        feedback,
        corrections
      };
    },
    hints: [
      "The container needs 'display: flex' to start using Flexbox.",
      "'justify-content' controls the main axis (horizontal by default).",
      "'align-items' controls the cross axis (vertical by default).",
      "Try 'box-shadow: 0 0 20px #00f3ff' for the neon effect."
    ]
  },
  "3": {
    id: 3,
    title: "The Specificity Monster",
    objective: "Defeat the monster by overriding its styles using higher specificity.",
    description: "A boss battle against conflicting CSS rules. Use your selectors wisely.",
    difficulty: "Boss",
    xpReward: 1500,
    instructions: [
      "Change the monster's color to brand-magenta (#ff00ea) using an ID selector.",
      "Scale the monster to 1.5x using a more specific selector than just .monster.",
      "Add a 'vulnerable' class to the monster and style it with a golden border."
    ],
    initialHtml: `<div id="battleground">
  <div id="boss-target" class="monster">👾</div>
</div>`,
    initialCss: `.monster {
  font-size: 5rem;
  color: #333;
  transition: all 0.5s;
  padding: 20px;
  border: 5px solid transparent;
}

#battleground .monster {
  color: #444; /* The monster is resistant! */
}`,
    initialJs: ``,
    validation: (html, css, js) => {
      const feedback = [];
      const corrections = [];
      let score = 0;
      
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();

      if (/#boss-target[^{]*\{[^}]*color:#ff00ea/.test(cleanCss)) {
        score += 40;
        feedback.push("✅ Boss color overridden via ID selector.");
      } else {
        corrections.push("Use the ID selector #boss-target to change the color to #ff00ea.");
      }

      if (/transform:scale\(1\.5\)/.test(cleanCss)) {
        score += 30;
        feedback.push("✅ Monster scaled up successfully.");
      } else {
        corrections.push("Use 'transform: scale(1.5)' to increase the monster's size.");
      }

      const cleanHtml = html.replace(/\s+/g, '').toLowerCase();
      if (cleanHtml.includes("class=") && cleanHtml.includes("vulnerable") && /\.vulnerable[^{]*\{[^}]*border/.test(cleanCss)) {
        score += 30;
        feedback.push("✅ Vulnerability state exposed.");
      } else {
        corrections.push("Add the 'vulnerable' class to the monster and style it with a border.");
      }

      return {
        passed: score >= 70,
        score,
        feedback,
        corrections
      };
    },
    hints: [
      "ID selectors (#id) have higher specificity than class selectors.",
      "Combining selectors (e.g., #battleground #boss-target) increases specificity.",
      "Don't forget to add the 'vulnerable' class to the HTML element."
    ]
  },
  "4": {
    id: 4,
    title: "JavaScript Ninja",
    objective: "Create a countdown timer using JavaScript.",
    description: "DOM manipulation and event handling under pressure.",
    difficulty: "Medium",
    xpReward: 750,
    instructions: [
      "Select the #timer element.",
      "Create a variable 'timeLeft' starting at 10.",
      "Use setInterval to decrement 'timeLeft' every second.",
      "Update the innerText of #timer with the current value.",
      "Stop the timer when it reaches 0."
    ],
    initialHtml: `<div class="console">
  <div id="timer">10</div>
  <button id="start-btn">INITIATE_COUNTDOWN</button>
</div>`,
    initialCss: `.console {
  background: #0a0a0f;
  border: 1px solid #00f3ff;
  padding: 40px;
  text-align: center;
  border-radius: 20px;
}
#timer {
  font-size: 5rem;
  font-family: monospace;
  color: #fcee0a;
  margin-bottom: 20px;
}
button {
  background: #00f3ff;
  color: black;
  border: none;
  padding: 15px 30px;
  font-weight: bold;
  cursor: pointer;
}`,
    initialJs: `const timer = document.getElementById('timer');
const btn = document.getElementById('start-btn');

btn.addEventListener('click', () => {
  // Your code here
});`,
    validation: (html, css, js) => {
      const feedback = [];
      const corrections = [];
      let score = 0;
      
      const cleanJs = js.replace(/\s+/g, '');

      if (cleanJs.includes("setInterval(")) {
        score += 30;
        feedback.push("✅ Interval timer initialized.");
      } else {
        corrections.push("Use setInterval to run code every second.");
      }

      if (cleanJs.includes(".innerText=") || cleanJs.includes(".innerHTML=") || cleanJs.includes(".textContent=")) {
        score += 40;
        feedback.push("✅ DOM element text being updated.");
      } else {
        corrections.push("Update the timer element's text as it counts down.");
      }

      if (cleanJs.includes("clearInterval(")) {
        score += 30;
        feedback.push("✅ Safety check: Interval cleared at zero.");
      } else {
        corrections.push("Remember to use clearInterval() when the countdown finishes.");
      }

      return {
        passed: score >= 70,
        score,
        feedback,
        corrections
      };
    },
    hints: [
      "Use document.getElementById('timer') to get the element.",
      "setInterval(callback, 1000) will run the callback every second.",
      "Don't forget to store the interval ID so you can clear it later."
    ]
  },
  "5": {
    id: 5,
    title: "Grid Master",
    objective: "Arrange the data cores using CSS Grid.",
    description: "Master the grid layout system to organize a 2D matrix.",
    difficulty: "Medium",
    xpReward: 500,
    instructions: [
      "Set the container display to grid.",
      "Create 3 equal columns using grid-template-columns.",
      "Add a gap of 20px between grid items."
    ],
    initialHtml: `<div class="grid-container">
  <div class="core">1</div><div class="core">2</div><div class="core">3</div>
  <div class="core">4</div><div class="core">5</div><div class="core">6</div>
</div>`,
    initialCss: `.grid-container {
  background: #0a0a0f;
  padding: 20px;
  border: 1px solid #ff00ea;
}
.core {
  background: #ff00ea;
  color: black;
  padding: 20px;
  text-align: center;
  font-weight: bold;
}`,
    initialJs: ``,
    validation: (html, css, js) => {
      let score = 0;
      const feedback = [];
      const corrections = [];
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();
      
      if (cleanCss.includes("display:grid")) {
        score += 30; feedback.push("✅ Grid activated.");
      } else corrections.push("Set display: grid on the container.");
      
      if (cleanCss.includes("grid-template-columns:repeat(3,1fr)") || cleanCss.includes("grid-template-columns:1fr1fr1fr")) {
        score += 40; feedback.push("✅ 3 columns established.");
      } else corrections.push("Use grid-template-columns to create 3 equal columns.");
      
      if (cleanCss.includes("gap:20px") || cleanCss.includes("grid-gap:20px")) {
        score += 30; feedback.push("✅ Grid gap set.");
      } else corrections.push("Add a 20px gap to the grid.");
      
      return { passed: score >= 70, score, feedback, corrections };
    },
    hints: ["Use 'grid-template-columns: repeat(3, 1fr)' for equal columns.", "The 'gap' property handles both row and column spacing."]
  },
  "6": {
    id: 6,
    title: "The Array Sorter",
    objective: "Sort the network nodes by priority.",
    description: "Use JavaScript array methods to organize data.",
    difficulty: "Medium",
    xpReward: 600,
    instructions: [
      "Use the .sort() method on the nodes array.",
      "Sort the array in descending order based on the 'priority' property.",
      "Log the sorted array to the console."
    ],
    initialHtml: `<div class="console-output">Check the terminal logs!</div>`,
    initialCss: `.console-output { color: #00f3ff; font-family: monospace; }`,
    initialJs: `const nodes = [
  { id: 'alpha', priority: 45 },
  { id: 'beta', priority: 99 },
  { id: 'gamma', priority: 12 }
];

// Write sorting logic here
`,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanJs = js.replace(/\s+/g, '');
      if (cleanJs.includes(".sort(")) { score += 40; feedback.push("✅ Array sort method called."); }
      else corrections.push("Use the .sort() method on the nodes array.");
      
      if (cleanJs.includes("b.priority-a.priority")) { score += 40; feedback.push("✅ Descending priority logic found."); }
      else corrections.push("Sort descending: (a, b) => b.priority - a.priority.");
      
      if (cleanJs.includes("console.log(")) { score += 20; feedback.push("✅ Output logged."); }
      else corrections.push("Remember to console.log the result.");
      
      return { passed: score >= 80, score, feedback, corrections };
    },
    hints: ["Array.prototype.sort() takes a compare function.", "For descending numbers, return b - a."]
  },
  "7": {
    id: 7,
    title: "Neon Pulse",
    objective: "Create a pulsing CSS animation.",
    description: "Bring the UI to life with CSS keyframes.",
    difficulty: "Medium",
    xpReward: 550,
    instructions: [
      "Define an @keyframes rule named 'pulse'.",
      "Make the opacity go from 1 to 0.5 and back.",
      "Apply the animation to the .neon-text class for 2 seconds, infinite loop."
    ],
    initialHtml: `<h1 class="neon-text">SYSTEM ONLINE</h1>`,
    initialCss: `.neon-text {
  color: #00f3ff;
  text-shadow: 0 0 10px #00f3ff;
  font-family: sans-serif;
}
/* Add keyframes and animation here */`,
    initialJs: ``,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();
      if (cleanCss.includes("@keyframespulse{")) { score += 40; feedback.push("✅ Pulse keyframes defined."); }
      else corrections.push("Create an @keyframes block named 'pulse'.");
      
      if (cleanCss.includes("opacity:0.5") || cleanCss.includes("opacity:.5")) { score += 30; feedback.push("✅ Opacity shift detected."); }
      else corrections.push("Ensure the pulse keyframes change the opacity to 0.5.");
      
      if (cleanCss.includes("animation:pulse") && cleanCss.includes("infinite")) { score += 30; feedback.push("✅ Animation applied to text."); }
      else corrections.push("Apply 'animation: pulse 2s infinite' to .neon-text.");
      
      return { passed: score >= 70, score, feedback, corrections };
    },
    hints: ["@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }"]
  },
  "8": {
    id: 8,
    title: "Event Interceptor",
    objective: "Intercept the form submission using JavaScript.",
    description: "Prevent default browser behavior and handle events dynamically.",
    difficulty: "Medium",
    xpReward: 650,
    instructions: [
      "Select the form element.",
      "Add a 'submit' event listener to it.",
      "Call e.preventDefault() to stop the page from reloading."
    ],
    initialHtml: `<form id="hack-form">
  <input type="text" placeholder="Enter payload..." />
  <button type="submit">INJECT</button>
</form>`,
    initialCss: `form { display: flex; gap: 10px; padding: 20px; }
input { background: #111; color: #00f3ff; border: 1px solid #00f3ff; padding: 10px; }
button { background: #00f3ff; color: black; font-weight: bold; padding: 10px 20px; }`,
    initialJs: `// Intercept the form submission`,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanJs = js.replace(/\s+/g, '');
      if (cleanJs.includes("addEventListener('submit'")) { score += 50; feedback.push("✅ Submit listener attached."); }
      else corrections.push("Add a 'submit' event listener to the form.");
      
      if (cleanJs.includes(".preventDefault()")) { score += 50; feedback.push("✅ Default behavior prevented."); }
      else corrections.push("Use event.preventDefault() inside the listener.");
      
      return { passed: score === 100, score, feedback, corrections };
    },
    hints: ["form.addEventListener('submit', function(e) { ... })", "e.preventDefault() stops the page reload."]
  },
  "9": {
    id: 9,
    title: "The Async Wraith",
    objective: "Fetch data from a remote endpoint and handle the promise.",
    description: "Boss Battle: Master asynchronous JavaScript to reveal the Wraith's true form.",
    difficulty: "Boss",
    xpReward: 2000,
    instructions: [
      "Create an async function named 'revealWraith'.",
      "Use the fetch() API to get data from 'https://api.coderealm.dev/wraith'.",
      "Await the response and parse it as JSON.",
      "Log the data to the console."
    ],
    initialHtml: `<div class="wraith-chamber">
  <p class="status">Awaiting remote connection...</p>
</div>`,
    initialCss: `.wraith-chamber { border: 2px solid #ff00ea; padding: 40px; color: #ff00ea; font-family: monospace; }`,
    initialJs: `// The Wraith is hiding behind an API. Fetch it.`,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanJs = js.replace(/\s+/g, '');
      if (cleanJs.includes("asyncfunctionrevealWraith()")) { score += 25; feedback.push("✅ Async function defined."); }
      else corrections.push("Define an 'async function revealWraith()'.");
      
      if (cleanJs.includes("awaitfetch(")) { score += 30; feedback.push("✅ Fetch API called with await."); }
      else corrections.push("Use 'await fetch(...)' to get the data.");
      
      if (cleanJs.includes(".json()")) { score += 25; feedback.push("✅ Response parsed to JSON."); }
      else corrections.push("Don't forget to await response.json().");
      
      if (cleanJs.includes("console.log(")) { score += 20; feedback.push("✅ Wraith data logged."); }
      else corrections.push("Log the final JSON data to the console.");
      
      return { passed: score >= 75, score, feedback, corrections };
    },
    hints: ["async function revealWraith() { const res = await fetch('url'); ... }"]
  },
  "10": {
    id: 10,
    title: "Absolute Control",
    objective: "Position the satellite absolutely to the top right of the viewport.",
    description: "Master CSS absolute positioning and relative containers.",
    difficulty: "Easy",
    xpReward: 400,
    instructions: [
      "Set the .space container to relative positioning.",
      "Set the .satellite to absolute positioning.",
      "Position the satellite 10px from the top and 10px from the right."
    ],
    initialHtml: `<div class="space">
  <div class="satellite">🛰️</div>
</div>`,
    initialCss: `.space {
  width: 100%;
  height: 200px;
  background: #000;
  border: 1px solid #333;
}
.satellite {
  font-size: 2rem;
}`,
    initialJs: ``,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();
      if (cleanCss.includes("position:relative") && cleanCss.indexOf(".space{") < cleanCss.indexOf("position:relative")) { score += 30; feedback.push("✅ Space set to relative."); }
      else corrections.push("Set position: relative on the .space container.");
      
      if (cleanCss.includes("position:absolute")) { score += 30; feedback.push("✅ Satellite set to absolute."); }
      else corrections.push("Set position: absolute on the .satellite.");
      
      if (cleanCss.includes("top:10px") && cleanCss.includes("right:10px")) { score += 40; feedback.push("✅ Satellite positioned correctly."); }
      else corrections.push("Set top: 10px and right: 10px on the satellite.");
      
      return { passed: score === 100, score, feedback, corrections };
    },
    hints: ["Absolute elements are positioned relative to their closest relative parent."]
  },
  "11": {
    id: 11,
    title: "Data Entry",
    objective: "Build a semantic HTML form for user authentication.",
    description: "Learn essential form attributes for robust data collection.",
    difficulty: "Easy",
    xpReward: 350,
    instructions: [
      "Add a 'required' attribute to both input fields.",
      "Change the password input type from 'text' to 'password'.",
      "Add a 'for' attribute to the labels matching the input IDs."
    ],
    initialHtml: `<form class="auth">
  <label>Username</label>
  <input type="text" id="user" />
  
  <label>Password</label>
  <input type="text" id="pass" />
  
  <button type="submit">LOGIN</button>
</form>`,
    initialCss: `.auth { display: flex; flex-direction: column; max-w: 300px; gap: 10px; }
input { background: transparent; border: 1px solid #00f3ff; color: white; padding: 5px; }`,
    initialJs: ``,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanHtml = html.replace(/\s+/g, '').toLowerCase();
      if ((cleanHtml.match(/required/g) || []).length >= 2) { score += 40; feedback.push("✅ Inputs marked as required."); }
      else corrections.push("Add the 'required' attribute to both inputs.");
      
      if (cleanHtml.includes("type=\"password\"") || cleanHtml.includes("type='password'")) { score += 30; feedback.push("✅ Password field hidden."); }
      else corrections.push("Change the password input type to 'password'.");
      
      if (cleanHtml.includes("for=\"user\"") && cleanHtml.includes("for=\"pass\"")) { score += 30; feedback.push("✅ Labels semantically linked."); }
      else corrections.push("Add 'for' attributes to labels matching the input IDs.");
      
      return { passed: score >= 70, score, feedback, corrections };
    },
    hints: ["<input type='password' required />", "<label for='user'> links to <input id='user'>"]
  },
  "12": {
    id: 12,
    title: "The Ghost Elements",
    objective: "Use ::before and ::after pseudo-elements to create cyber-accents.",
    description: "Inject content and styling via CSS without modifying the HTML.",
    difficulty: "Medium",
    xpReward: 600,
    instructions: [
      "Add a ::before pseudo-element to .card.",
      "Set its 'content' property to an empty string ''.",
      "Give it absolute positioning and a top border of 2px solid #00f3ff."
    ],
    initialHtml: `<div class="card">SECURE DATA</div>`,
    initialCss: `.card {
  position: relative;
  background: #111;
  padding: 40px;
  color: white;
  text-align: center;
}`,
    initialJs: ``,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();
      if (cleanCss.includes(".card::before") || cleanCss.includes(".card:before")) { score += 40; feedback.push("✅ Pseudo-element targeted."); }
      else corrections.push("Use the .card::before selector.");
      
      if (cleanCss.includes("content:\"\"") || cleanCss.includes("content:''")) { score += 30; feedback.push("✅ Content property defined."); }
      else corrections.push("Pseudo-elements must have a content property, even if empty.");
      
      if (cleanCss.includes("position:absolute") && cleanCss.includes("border-top:2pxsolid#00f3ff")) { score += 30; feedback.push("✅ Cyber accent styled."); }
      else corrections.push("Make it position:absolute and add the 2px solid #00f3ff top border.");
      
      return { passed: score >= 70, score, feedback, corrections };
    },
    hints: [".card::before { content: ''; position: absolute; ... }"]
  },
  "13": {
    id: 13,
    title: "Object Modder",
    objective: "Modify the configuration object dynamically.",
    description: "Learn to mutate and access JavaScript object properties.",
    difficulty: "Medium",
    xpReward: 650,
    instructions: [
      "Add a new property 'shield' set to true on the config object.",
      "Update the 'power' property to 9000.",
      "Delete the 'vulnerability' property from the object."
    ],
    initialHtml: `<div class="status">Hacking Object...</div>`,
    initialCss: `.status { color: #00f3ff; font-family: monospace; }`,
    initialJs: `const config = {
  power: 100,
  speed: 50,
  vulnerability: true
};

// Modify the config object below
`,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanJs = js.replace(/\s+/g, '');
      if (cleanJs.includes("config.shield=true") || cleanJs.includes("config['shield']=true")) { score += 40; feedback.push("✅ Shield activated."); }
      else corrections.push("Add the 'shield' property and set it to true.");
      
      if (cleanJs.includes("config.power=9000") || cleanJs.includes("config['power']=9000")) { score += 30; feedback.push("✅ Power levels over 9000."); }
      else corrections.push("Update the 'power' property to 9000.");
      
      if (cleanJs.includes("deleteconfig.vulnerability") || cleanJs.includes("deleteconfig['vulnerability']")) { score += 30; feedback.push("✅ Vulnerability patched."); }
      else corrections.push("Use the 'delete' keyword to remove the 'vulnerability' property.");
      
      return { passed: score >= 70, score, feedback, corrections };
    },
    hints: ["Use dot notation: config.shield = true;", "Use delete object.property;"]
  },
  "14": {
    id: 14,
    title: "The Responsive Behemoth",
    objective: "Defeat the Behemoth by making it responsive.",
    description: "Boss Battle: Use CSS Media Queries to adapt the layout for mobile devices.",
    difficulty: "Boss",
    xpReward: 2500,
    instructions: [
      "Add a media query for screens max-width: 600px.",
      "Inside the query, change the .behemoth flex-direction to column.",
      "Inside the query, reduce the font-size of the h1 to 2rem."
    ],
    initialHtml: `<div class="behemoth">
  <h1>BEHEMOTH CORE</h1>
  <div class="reactor"></div>
</div>`,
    initialCss: `.behemoth {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 40px;
  background: #220000;
  border: 4px solid red;
}
h1 { font-size: 5rem; color: red; }
.reactor { width: 100px; height: 100px; background: #ff00ea; }
/* Add media query here */`,
    initialJs: ``,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();
      if (cleanCss.includes("@media(max-width:600px)")) { score += 40; feedback.push("✅ Media query established."); }
      else corrections.push("Create an @media (max-width: 600px) block.");
      
      if (cleanCss.includes(".behemoth{flex-direction:column}")) { score += 30; feedback.push("✅ Flex direction adapted."); }
      else corrections.push("Change .behemoth's flex-direction to column inside the media query.");
      
      if (cleanCss.includes("h1{font-size:2rem}")) { score += 30; feedback.push("✅ Font size scaled."); }
      else corrections.push("Reduce the h1 font-size to 2rem inside the media query.");
      
      return { passed: score >= 70, score, feedback, corrections };
    },
    hints: ["@media (max-width: 600px) { .behemoth { ... } }"]
  },
  "15": {
    id: 15,
    title: "Theme Hacker",
    objective: "Hack the global CSS variables to change the theme.",
    description: "Master CSS Custom Properties (Variables).",
    difficulty: "Medium",
    xpReward: 700,
    instructions: [
      "In the :root selector, change --main-color to #ff00ea.",
      "Change --bg-color to #000.",
      "Apply var(--main-color) to the color property of the .hacked-text."
    ],
    initialHtml: `<h1 class="hacked-text">System Compromised</h1>`,
    initialCss: `:root {
  --main-color: #00f3ff;
  --bg-color: #222;
}
body { background: var(--bg-color); }
.hacked-text {
  font-size: 3rem;
  /* Apply color here */
}`,
    initialJs: ``,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();
      if (cleanCss.includes("--main-color:#ff00ea")) { score += 30; feedback.push("✅ Main color hacked."); }
      else corrections.push("Change --main-color to #ff00ea in :root.");
      
      if (cleanCss.includes("--bg-color:#000")) { score += 30; feedback.push("✅ Background color hacked."); }
      else corrections.push("Change --bg-color to #000 in :root.");
      
      if (cleanCss.includes("color:var(--main-color)")) { score += 40; feedback.push("✅ Variable applied successfully."); }
      else corrections.push("Apply var(--main-color) to the color property of .hacked-text.");
      
      return { passed: score >= 70, score, feedback, corrections };
    },
    hints: ["Use color: var(--main-color);"]
  },
  "16": {
    id: 16,
    title: "The Loop Runner",
    objective: "Iterate over the array to build a list.",
    description: "Use a loop to dynamically generate HTML strings.",
    difficulty: "Medium",
    xpReward: 750,
    instructions: [
      "Create a 'let htmlString = \"\"' variable.",
      "Use a for loop or forEach to iterate over the 'users' array.",
      "Append '<li>' + user + '</li>' to htmlString.",
      "Set listElement.innerHTML = htmlString."
    ],
    initialHtml: `<ul id="user-list"></ul>`,
    initialCss: `ul { color: #00f3ff; font-family: monospace; }`,
    initialJs: `const users = ['Neo', 'Trinity', 'Morpheus'];
const listElement = document.getElementById('user-list');

// Write loop here
`,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanJs = js.replace(/\s+/g, '');
      if (cleanJs.includes("for(") || cleanJs.includes(".forEach(")) { score += 40; feedback.push("✅ Loop structure initiated."); }
      else corrections.push("Use a for loop or array.forEach().");
      
      if (cleanJs.includes("<li>") && cleanJs.includes("</li>")) { score += 30; feedback.push("✅ List item tags concatenated."); }
      else corrections.push("Append <li> and </li> tags to your string inside the loop.");
      
      if (cleanJs.includes(".innerHTML=")) { score += 30; feedback.push("✅ DOM updated successfully."); }
      else corrections.push("Set the final string to listElement.innerHTML.");
      
      return { passed: score >= 70, score, feedback, corrections };
    },
    hints: ["users.forEach(user => htmlString += '<li>' + user + '</li>');"]
  },
  "17": {
    id: 17,
    title: "Pixel Painter",
    objective: "Draw a rectangle on the HTML Canvas.",
    description: "Explore the Canvas API to render 2D graphics.",
    difficulty: "Hard",
    xpReward: 800,
    instructions: [
      "Get the 2D rendering context from the canvas element.",
      "Set the fillStyle to '#ff00ea'.",
      "Draw a filled rectangle (fillRect) at x=50, y=50, width=100, height=100."
    ],
    initialHtml: `<canvas id="matrix" width="200" height="200"></canvas>`,
    initialCss: `canvas { background: #111; border: 1px solid #333; }`,
    initialJs: `const canvas = document.getElementById('matrix');
// Get context and draw here
`,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanJs = js.replace(/\s+/g, '');
      if (cleanJs.includes(".getContext('2d'") || cleanJs.includes(".getContext(\"2d\"")) { score += 30; feedback.push("✅ 2D Context acquired."); }
      else corrections.push("Use canvas.getContext('2d') to get the rendering context.");
      
      if (cleanJs.includes("fillStyle='#ff00ea'") || cleanJs.includes("fillStyle=\"#ff00ea\"")) { score += 30; feedback.push("✅ Fill style set."); }
      else corrections.push("Set ctx.fillStyle = '#ff00ea'.");
      
      if (cleanJs.includes("fillRect(50,50,100,100)")) { score += 40; feedback.push("✅ Rectangle painted."); }
      else corrections.push("Call ctx.fillRect(50, 50, 100, 100).");
      
      return { passed: score >= 70, score, feedback, corrections };
    },
    hints: ["const ctx = canvas.getContext('2d'); ctx.fillStyle = '#ff00ea'; ctx.fillRect(50,50,100,100);"]
  },
  "18": {
    id: 18,
    title: "Shape Shifter",
    objective: "Rotate and translate the element simultaneously.",
    description: "Master complex CSS transformations.",
    difficulty: "Medium",
    xpReward: 650,
    instructions: [
      "Apply a CSS transform property to the .shifter.",
      "Translate it 50px on the X axis.",
      "Rotate it 45 degrees."
    ],
    initialHtml: `<div class="shifter">SHIFT</div>`,
    initialCss: `.shifter {
  width: 100px;
  height: 100px;
  background: #00f3ff;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}`,
    initialJs: ``,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();
      if (cleanCss.includes("transform:translatex(50px)rotate(45deg)") || cleanCss.includes("transform:translate(50px)rotate(45deg)") || cleanCss.includes("transform:rotate(45deg)translatex(50px)")) { score += 100; feedback.push("✅ Transform applied perfectly."); }
      else corrections.push("Use 'transform: translateX(50px) rotate(45deg);'");
      
      return { passed: score === 100, score, feedback, corrections };
    },
    hints: ["Transform properties are space separated: transform: translateX(50px) rotate(45deg);"]
  },
  "19": {
    id: 19,
    title: "Memory Lock",
    objective: "Create a closure to encapsulate state.",
    description: "Understand JavaScript closures and lexical scoping.",
    difficulty: "Hard",
    xpReward: 900,
    instructions: [
      "Complete the 'createLock' function.",
      "It should return a function that increments a private 'count' variable and returns it.",
      "Do not expose 'count' globally."
    ],
    initialHtml: `<div class="console">Check terminal!</div>`,
    initialCss: `.console { color: #00f3ff; font-family: monospace; }`,
    initialJs: `function createLock() {
  let count = 0;
  // Return an inner function here
}

const lock = createLock();
console.log(lock()); // Should output 1
console.log(lock()); // Should output 2`,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanJs = js.replace(/\s+/g, '');
      if (cleanJs.includes("returnfunction()") || cleanJs.includes("return()=>")) { score += 50; feedback.push("✅ Inner function returned."); }
      else corrections.push("Return an inner function from createLock.");
      
      if (cleanJs.includes("count++") || cleanJs.includes("count+=1") || cleanJs.includes("++count")) { score += 50; feedback.push("✅ Private state mutated."); }
      else corrections.push("Increment the private 'count' variable inside the inner function.");
      
      return { passed: score === 100, score, feedback, corrections };
    },
    hints: ["return function() { count++; return count; }"]
  },
  "20": {
    id: 20,
    title: "The Fullstack Overlord",
    objective: "Combine HTML, CSS, and JS to defeat the final boss.",
    description: "Final Boss: Create a semantic button, style it with neon CSS, and add an alert listener.",
    difficulty: "Boss",
    xpReward: 5000,
    instructions: [
      "HTML: Create a <button> with id 'nuke-btn'.",
      "CSS: Style #nuke-btn with background 'red' and color 'white'.",
      "JS: Add a click event to 'nuke-btn' that triggers an alert()."
    ],
    initialHtml: `<!-- Build the button here -->`,
    initialCss: `/* Style the button here */`,
    initialJs: `// Add event listener here`,
    validation: (html, css, js) => {
      let score = 0; const feedback = []; const corrections = [];
      const cleanHtml = html.replace(/\s+/g, '').toLowerCase();
      const cleanCss = css.replace(/\s+/g, '').toLowerCase();
      const cleanJs = js.replace(/\s+/g, '');
      
      if (cleanHtml.includes("<buttonid=\"nuke-btn\"") || cleanHtml.includes("<buttonid='nuke-btn'")) { score += 30; feedback.push("✅ Weaponized button constructed."); }
      else corrections.push("Create a <button> with id 'nuke-btn'.");
      
      if (cleanCss.includes("#nuke-btn") && cleanCss.includes("background:red") && cleanCss.includes("color:white")) { score += 30; feedback.push("✅ Button styling armed."); }
      else corrections.push("Style #nuke-btn with background: red and color: white.");
      
      if (cleanJs.includes("addEventListener('click'") && cleanJs.includes("alert(")) { score += 40; feedback.push("✅ Ignition sequence initiated."); }
      else corrections.push("Add a click event listener to the button that calls alert().");
      
      return { passed: score >= 100, score, feedback, corrections };
    },
    hints: ["Combine everything you've learned. You are the Code Realm Overlord now."]
  }
};

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
  }
};

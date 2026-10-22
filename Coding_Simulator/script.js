const questions = [
  {
    title: "Eliminate vowels",
    html: `
      <div class="question-copy">
        <p>The current selected programming language is <span class="emphasis">Java 8</span>. We emphasize the submission of a fully working code over partially correct but efficient code. Once submitted, you cannot review this problem again.<br>
        You can use code to debug your code. The code may not work in case of syntax/runtime error.<br>
        The version of Java being used is <span class="emphasis">Java 8</span>.</p>

        <p>The vowels of the English alphabet are (a, e, i, o, u, A, E, I, O, U). Write an algorithm to eliminate all vowels from a given string.</p>

        <h3>Input</h3>
        <p>The input consists of a string.</p>

        <h3>Output</h3>
        <p>Print a string that excludes all the vowels of the given input string.</p>

        <h3>Note</h3>
        <p>The vowels of the English alphabet are (a, e, i, o, u, A, E, I, O, U).</p>
        <p>The input string contains English letters only.</p>

        <h3>Constraints</h3>
        <p>0 ≤ len ≤ 100, where len is length of the input string.</p>

        <div class="example-box">
          <h3>Example</h3>
          <p class="example-label">Input:</p>
          <p>haveaniceday</p>

          <p class="example-label">Output:</p>
          <p>hvn cdy</p>

          <p class="example-label">Explanation:</p>
          <p>The output string is "hvncd y" after removing every vowel.</p>
        </div>
      </div>
    `
  },
  {
    title: "Reverse a string",
    html: `
      <div class="question-copy">
        <p>The current selected programming language is <span class="emphasis">Java 8</span>. We emphasize the submission of a fully working code over partially correct but efficient code. Once submitted, you cannot review this problem again.</p>

        <p>Write an algorithm to reverse the characters of a given string.</p>

        <h3>Input</h3>
        <p>The input consists of a string.</p>

        <h3>Output</h3>
        <p>Print the input string in reverse order.</p>

        <h3>Note</h3>
        <p>The input string contains English letters only.</p>

        <h3>Constraints</h3>
        <p>0 ≤ len ≤ 100, where len is length of the input string.</p>

        <div class="example-box">
          <h3>Example</h3>
          <p class="example-label">Input:</p>
          <p>hello</p>

          <p class="example-label">Output:</p>
          <p>olleh</p>
        </div>
      </div>
    `
  },
  {
    title: "Count characters",
    html: `
      <div class="question-copy">
        <p>The current selected programming language is <span class="emphasis">Java 8</span>. We emphasize the submission of a fully working code over partially correct but efficient code. Once submitted, you cannot review this problem again.</p>

        <p>Write an algorithm to count the number of characters in a given string.</p>

        <h3>Input</h3>
        <p>The input consists of a string.</p>

        <h3>Output</h3>
        <p>Print the length of the given string.</p>

        <h3>Constraints</h3>
        <p>0 ≤ len ≤ 100, where len is length of the input string.</p>

        <div class="example-box">
          <h3>Example</h3>
          <p class="example-label">Input:</p>
          <p>coding</p>

          <p class="example-label">Output:</p>
          <p>6</p>
        </div>
      </div>
    `
  }
];

const starterCode = [
`// Sample code to read input and write output:
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();       // Read input from STDIN
        System.out.println("Hello " + name); // Write output to STDOUT
        return;
    }
}

// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail.

import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Write your code here
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();

        for (char c : s.toCharArray()) {
            if (c != 'a' && c != 'e' && c != 'i' && c != 'o' && c != 'u' &&
                c != 'A' && c != 'E' && c != 'I' && c != 'O' && c != 'U') {
                System.out.print(c);
            }
        }
    }
}`,
`// Sample code to read input and write output:
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        System.out.println("Hello " + name);
        return;
    }
}

// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail.

import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Write your code here
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(new StringBuilder(s).reverse());
    }
}`,
`// Sample code to read input and write output:
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String name = sc.nextLine();
        System.out.println("Hello " + name);
        return;
    }
}

// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail.

import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Write your code here
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine();
        System.out.println(s.length());
    }
}`
];

const sampleInputs = ["haveaniceday", "hello", "coding"];
let currentQuestion = 0;
let remainingSeconds = 30 * 60;
let timerInterval = null;

const questionContent = document.getElementById("questionContent");
const editor = document.getElementById("codeEditor");
const highlightLayer = document.getElementById("highlightLayer");
const lineNumbers = document.getElementById("lineNumbers");
const timer = document.getElementById("timer");
const runBtn = document.getElementById("runBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
prevBtn.addEventListener("click", () => {
    currentQuestion =
        (currentQuestion - 1 + questions.length) % questions.length;

    loadQuestion(currentQuestion);
}); 
const testOutput = document.getElementById("testOutput");
const outputContent = document.getElementById("outputContent");
const outputToggle = document.getElementById("outputToggle");
const editorWrap = document.getElementById("editorWrap");

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/*
  Small vanilla-JS Java highlighter.
  It deliberately does not use a framework or external editor library.
*/
function highlightJava(source) {
  let html = escapeHtml(source);

  const tokens = [];
  const stash = (match, className) => {
    const id = `___TOKEN_${tokens.length}___`;
    tokens.push(`<span class="${className}">${match}</span>`);
    return id;
  };

  // Comments first so keywords inside comments aren't highlighted.
  html = html.replace(/\/\/.*$/gm, m => stash(m, "comment"));
  html = html.replace(/\/\*[\s\S]*?\*\//g, m => stash(m, "comment"));

  // Strings and character literals.
  html = html.replace(/"(?:\\.|[^"\\])*"/g, m => stash(m, "str"));
  html = html.replace(/'(?:\\.|[^'\\])*'/g, m => stash(m, "str"));

  html = html.replace(/@\w+/g, m => stash(m, "annotation"));
  html = html.replace(/\b\d+(?:\.\d+)?\b/g, m => stash(m, "num"));

  html = html.replace(
    /\b(public|private|protected|static|final|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|throws|import|package|void|this|super|instanceof|true|false|null)\b/g,
    m => stash(m, "kw")
  );

  html = html.replace(
    /\b(String|Scanner|StringBuilder|System|Integer|Double|Boolean|Character|Object|Math|List|ArrayList|Map|HashMap)\b/g,
    m => stash(m, "type")
  );

  html = html.replace(
    /\b([A-Za-z_$][\w$]*)\s*(?=\()/g,
    m => stash(m, "method")
  );

  html = html.replace(/\b(AND|OR)\b/g, m => stash(m, "op"));

  // Put stored tokens back.
  html = html.replace(/___TOKEN_(\d+)___/g, (_, i) => tokens[Number(i)]);

  return html || " ";
}

function updateLineNumbers() {
  const count = Math.max(1, editor.value.split("\n").length);
  lineNumbers.innerHTML = Array.from(
    { length: count },
    (_, i) => `<div>${i + 1}</div>`
  ).join("");
}

function syncEditor() {
  highlightLayer.innerHTML = highlightJava(editor.value);
  updateLineNumbers();
  highlightLayer.scrollTop = editor.scrollTop;
  highlightLayer.scrollLeft = editor.scrollLeft;
  lineNumbers.scrollTop = editor.scrollTop;
}

function loadQuestion(index) {
  currentQuestion = index;
  questionContent.innerHTML = `<h3 style="display:none">${questions[index].title}</h3>${questions[index].html}`;
  editor.value = starterCode[index];
  testOutput.classList.remove("open");
  outputContent.textContent = "";
  syncEditor();
  editor.focus();
}

function formatTime(total) {
  const clamped = Math.max(0, total);
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function tick() {
  if (remainingSeconds <= 0) {
    remainingSeconds = 0;
    timer.textContent = "00:00";
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    return;
  }
  remainingSeconds--;
  timer.textContent = formatTime(remainingSeconds);
}

function getProgramOutput(input) {
  const code = editor.value;

  if (currentQuestion === 0) {
    // Simulate the browser-side result for the displayed Java problem.
    return input.replace(/[aeiouAEIOU]/g, "");
  }

  if (currentQuestion === 1) {
    return input.split("").reverse().join("");
  }

  return String(input.length);
}

editor.addEventListener("input", syncEditor);
editor.addEventListener("scroll", syncEditor);

document.addEventListener("keydown", event => {
  if (event.key === "Tab" && document.activeElement === editor) {
    event.preventDefault();
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value = editor.value.slice(0, start) + "    " + editor.value.slice(end);
    editor.selectionStart = editor.selectionEnd = start + 4;
    syncEditor();
  }
});

runBtn.addEventListener("click", () => {
  const input = sampleInputs[currentQuestion];
  const expected = getProgramOutput(input);

  outputContent.textContent =
    `Test Case 1\n` +
    `Input:  ${input}\n` +
    `Output: ${expected}\n\n` +
    `✓ Test case passed`;

  testOutput.classList.add("open");
});

outputToggle.addEventListener("click", () => {
  testOutput.classList.toggle("open");
});

nextBtn.addEventListener("click", () => {
  currentQuestion = (currentQuestion + 1) % questions.length;
  loadQuestion(currentQuestion);
});

document.getElementById("themeBtn")?.addEventListener("click", () => {
  editorWrap.classList.toggle("dark");
  syncEditor();
});

document.getElementById("undoBtn")?.addEventListener("click", () => {
  document.execCommand("undo");
  syncEditor();
});

document.getElementById("saveBtn")?.addEventListener("click", () => {
  const blob = new Blob([editor.value], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Main-${currentQuestion + 1}.java`;
  a.click();
  URL.revokeObjectURL(url);
});

document.getElementById("fullscreenBtn")?.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
});

document.getElementById("helpBtn")?.addEventListener("click", () => {
  alert("For test support, please contact your administrator or check the instructions.");
});

document.getElementById("exitBtn")?.addEventListener("click", () => {
  alert("Exit clicked");
});

document.getElementById("menuBtn")?.addEventListener("click", () => {
  alert("Menu clicked");
});


document.getElementById("tabCloseBtn")?.addEventListener("click", () => {
  alert("Tab close clicked");
});

document.getElementById("windowCloseBtn")?.addEventListener("click", () => {
  alert("Window close clicked");
});

document.getElementById("toolbarReload")?.addEventListener("click", () => {
  window.location.reload();
});

document.getElementById("toolbarBack")?.addEventListener("click", () => {
  window.history.back();
});

document.getElementById("toolbarInfo")?.addEventListener("click", () => {
  alert("Assessment info");
});

document.getElementById("toolbarDoc")?.addEventListener("click", () => {
  alert("Coding assessment instructions");
});

loadQuestion(0);
timer.textContent = formatTime(remainingSeconds);
if (timerInterval) clearInterval(timerInterval);
timerInterval = setInterval(tick, 1000);

window.addEventListener("beforeunload", () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
});

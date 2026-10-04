export interface JqueryProgramItem {
  id: string;
  number: number;
  title: string;
  code: string;
  noteLabel: string;
  noteContent: string[];
  extraContext?: {
    heading: string;
    codeSnippet: string;
    explanation: string;
  };
}

export const JQUERY_TIMESTAMP = 'Thu, Sep 17 at 12:26 PM';
export const JQUERY_HEADER_TITLE = 'Top 10 imp program of jquery';
export const JQUERY_INTRO_TEXT =
  'Bilkul. Web Engineering / practical / viva ke liye ye Top 10 important jQuery programs prepare karo. Maine basic se exam-oriented order mein rakhe hain.';

export const JQUERY_PROGRAMS: JqueryProgramItem[] = [
  {
    id: 'jq-1-hide-show',
    number: 1,
    title: '1. Hide & Show Element',
    code: `<!DOCTYPE html>
<html>
<head>
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
</head>
<body>

<p id="text">Hello jQuery</p>

<button id="hide">Hide</button>
<button id="show">Show</button>

<script>
$(document).ready(function(){
    $("#hide").click(function(){
        $("#text").hide();
    });

    $("#show").click(function(){
        $("#text").show();
    });
});
</script>

</body>
</html>`,
    noteLabel: 'Viva:',
    noteContent: ['hide() element ko hide karta hai, show() visible karta hai.'],
  },
  {
    id: 'jq-2-toggle',
    number: 2,
    title: '2. Toggle Element',
    code: `<p id="text">Welcome to jQuery</p>
<button id="btn">Toggle</button>

<script>
$(document).ready(function(){
    $("#btn").click(function(){
        $("#text").toggle();
    });
});
</script>`,
    noteLabel: 'Concept:',
    noteContent: ['Visible → Hide, Hide → Visible.'],
  },
  {
    id: 'jq-3-css',
    number: 3,
    title: '3. Change CSS Using jQuery',
    code: `<p id="text">Hello World</p>
<button id="btn">Change Style</button>

<script>
$(document).ready(function(){
    $("#btn").click(function(){
        $("#text").css({
            "color": "red",
            "font-size": "30px",
            "background-color": "yellow"
        });
    });
});
</script>`,
    noteLabel: 'Important:',
    noteContent: ['.css() CSS properties change karne ke liye.'],
  },
  {
    id: 'jq-4-text',
    number: 4,
    title: '4. Change Text Using text()',
    code: `<p id="msg">Old Text</p>
<button id="btn">Change Text</button>

<script>
$(document).ready(function(){
    $("#btn").click(function(){
        $("#msg").text("New Text");
    });
});
</script>`,
    noteLabel: 'Viva:',
    noteContent: ['text() plain text change karta hai.'],
  },
  {
    id: 'jq-5-html',
    number: 5,
    title: '5. Change HTML Using html()',
    code: `<div id="box">Old Content</div>
<button id="btn">Change</button>

<script>
$(document).ready(function(){
    $("#btn").click(function(){
        $("#box").html("<b>New Content</b>");
    });
});
</script>`,
    noteLabel: 'Difference:',
    noteContent: [
      'text() → HTML tags ko text ki tarah treat karta hai.',
      'html() → HTML tags render karta hai.',
    ],
  },
  {
    id: 'jq-6-class',
    number: 6,
    title: '6. Add / Remove Class',
    code: `<style>
.highlight {
    color: red;
    font-size: 25px;
}
</style>

<p id="text">Hello</p>
<button id="add">Add Class</button>
<button id="remove">Remove Class</button>

<script>
$(document).ready(function(){
    $("#add").click(function(){
        $("#text").addClass("highlight");
    });

    $("#remove").click(function(){
        $("#text").removeClass("highlight");
    });
});
</script>`,
    noteLabel: 'Important methods:',
    noteContent: ['addClass()', 'removeClass()', 'toggleClass()'],
  },
  {
    id: 'jq-7-fade',
    number: 7,
    title: '7. Fade In / Fade Out',
    code: `<div id="box">Hello jQuery</div>

<button id="in">Fade In</button>
<button id="out">Fade Out</button>

<script>
$(document).ready(function(){
    $("#in").click(function(){
        $("#box").fadeIn();
    });

    $("#out").click(function(){
        $("#box").fadeOut();
    });
});
</script>`,
    noteLabel: 'Other:',
    noteContent: ['fadeToggle(), fadeTo().'],
  },
  {
    id: 'jq-8-slide',
    number: 8,
    title: '8. Slide Up / Slide Down',
    code: `<p id="text">This is sliding content.</p>

<button id="up">Slide Up</button>
<button id="down">Slide Down</button>

<script>
$(document).ready(function(){
    $("#up").click(function(){
        $("#text").slideUp();
    });

    $("#down").click(function(){
        $("#text").slideDown();
    });
});
</script>`,
    noteLabel: 'Shortcut:',
    noteContent: ['slideToggle().'],
  },
  {
    id: 'jq-9-validation',
    number: 9,
    title: '9. Form Validation',
    code: `<form id="myForm">
    Name:
    <input type="text" id="name">
    <button type="submit">Submit</button>
</form>

<script>
$(document).ready(function(){
    $("#myForm").submit(function(e){
        e.preventDefault();

        let name = $("#name").val();

        if(name == ""){
            alert("Name is required");
        } else {
            alert("Form submitted successfully");
        }
    });
});
</script>`,
    noteLabel: 'Most important:',
    noteContent: ['.val() input ki value read karne ke liye.'],
  },
  {
    id: 'jq-10-ajax',
    number: 10,
    title: '10. AJAX — Load Data Without Refresh',
    code: `<button id="btn">Load Data</button>
<div id="result"></div>

<script>
$(document).ready(function(){
    $("#btn").click(function(){
        $("#result").load("data.txt");
    });
});
</script>`,
    noteLabel: 'Important:',
    noteContent: [
      'to button click karne par content page par load ho jayega without full page refresh.',
    ],
    extraContext: {
      heading: 'Agar data.txt mein:',
      codeSnippet: 'Welcome to jQuery AJAX',
      explanation:
        'to button click karne par content page par load ho jayega without full page refresh.',
    },
  },
];

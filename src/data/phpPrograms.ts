export interface PhpProgramItem {
  id: string;
  numberLabel: string;
  category: 'for-loop' | 'while-loop' | 'do-while-loop' | 'factorial';
  categoryLabel: string;
  title: string;
  questionPrompt?: string;
  timestamp?: string;
  introText?: string;
  code: string;
  output: string;
  extraNotes?: string[];
  vivaNote?: string;
  stepsPreview?: { iteration: number; iVal: string | number; detail: string }[];
}

export const PRACTICAL_TIMESTAMP = 'Fri, Sep 11 at 9:40 AM';

export const WHILE_LOOP_QUESTION_LIST = [
  'Print numbers from 1 to 10 using a while loop.',
  'Print even numbers from 2 to 20 using a while loop.',
  'Print odd numbers from 1 to 15 using a while loop.',
  'Print the multiplication table of 5 using a while loop.',
  'Print numbers from 10 to 1 in reverse order using a while loop.',
];

export const DO_WHILE_LOOP_QUESTION_LIST = [
  'Print numbers from 1 to 10 using a do-while loop.',
  'Print even numbers from 2 to 20 using a do-while loop.',
  'Print the multiplication table of 2 using a do-while loop.',
  'Print numbers from 10 to 1 in reverse order using a do-while loop.',
  'Print "Hello PHP" 5 times using a do-while loop.',
];

export const VIVA_TRICKS = [
  {
    term: 'while',
    explanation: 'पहले condition check → फिर loop execute.',
    englishSub: 'Entry-controlled loop: condition is evaluated before running the loop body.',
  },
  {
    term: 'do-while',
    explanation: 'पहले loop execute → फिर condition check.',
    englishSub: 'Exit-controlled loop: body executes at least once before checking the condition.',
  },
  {
    term: '$i++',
    explanation: 'value 1 से बढ़ती है.',
    englishSub: 'Post-increment operator: increases $i by 1 on each step.',
  },
  {
    term: '$i--',
    explanation: 'value 1 से घटती है.',
    englishSub: 'Post-decrement operator: decreases $i by 1 on each step.',
  },
  {
    term: '$i = $i + 2',
    explanation: 'केवल even/odd numbers आसानी से print होते हैं.',
    englishSub: 'Step jump by 2: skips alternate numbers to print only even or odd series.',
  },
];

export const PHP_PROGRAMS: PhpProgramItem[] = [
  {
    id: 'even-sum-0-to-10',
    numberLabel: 'Featured',
    category: 'for-loop',
    categoryLabel: 'For Loop Practical',
    timestamp: 'Fri, Sep 11 at 9:40 AM',
    title: 'Write a php code to print the sum of all even number between 0 to 10',
    introText: 'Here is a simple PHP code:',
    code: `<?php
$sum = 0;

for ($i = 0; $i <= 10; $i++) {
    if ($i % 2 == 0) {
        $sum = $sum + $i;
    }
}

echo "Sum of all even numbers between 0 to 10 = " . $sum;
?>`,
    output: 'Sum of all even numbers between 0 to 10 = 30',
    extraNotes: [
      'Even numbers: 0, 2, 4, 6, 8, 10',
      'Sum = 30 ✅',
    ],
    stepsPreview: [
      { iteration: 1, iVal: 0, detail: '0 % 2 == 0 (True) → $sum = 0 + 0 = 0' },
      { iteration: 2, iVal: 2, detail: '2 % 2 == 0 (True) → $sum = 0 + 2 = 2' },
      { iteration: 3, iVal: 4, detail: '4 % 2 == 0 (True) → $sum = 2 + 4 = 6' },
      { iteration: 4, iVal: 6, detail: '6 % 2 == 0 (True) → $sum = 6 + 6 = 12' },
      { iteration: 5, iVal: 8, detail: '8 % 2 == 0 (True) → $sum = 12 + 8 = 20' },
      { iteration: 6, iVal: 10, detail: '10 % 2 == 0 (True) → $sum = 20 + 10 = 30' },
    ],
  },
  {
    id: 'while-1-to-10',
    numberLabel: '1',
    category: 'while-loop',
    categoryLabel: 'While Loop – Practical Questions',
    title: '1. Print numbers from 1 to 10',
    questionPrompt: 'Print numbers from 1 to 10 using a while loop.',
    code: `<?php
$i = 1;

while ($i <= 10) {
    echo $i . " ";
    $i++;
}
?>`,
    output: '1 2 3 4 5 6 7 8 9 10',
    stepsPreview: [
      { iteration: 1, iVal: 1, detail: 'Condition 1 <= 10 True → prints "1 ", $i becomes 2' },
      { iteration: 2, iVal: 2, detail: 'Condition 2 <= 10 True → prints "2 ", $i becomes 3' },
      { iteration: 10, iVal: 10, detail: 'Condition 10 <= 10 True → prints "10 ", $i becomes 11 (stops)' },
    ],
  },
  {
    id: 'while-even-2-to-20',
    numberLabel: '2',
    category: 'while-loop',
    categoryLabel: 'While Loop – Practical Questions',
    title: '2. Print even numbers from 2 to 20',
    questionPrompt: 'Print even numbers from 2 to 20 using a while loop.',
    code: `<?php
$i = 2;

while ($i <= 20) {
    echo $i . " ";
    $i = $i + 2;
}
?>`,
    output: '2 4 6 8 10 12 14 16 18 20',
    stepsPreview: [
      { iteration: 1, iVal: 2, detail: 'Starts at $i = 2 → prints "2 ", $i = 2 + 2 = 4' },
      { iteration: 2, iVal: 4, detail: 'Condition 4 <= 20 True → prints "4 ", $i = 4 + 2 = 6' },
      { iteration: 10, iVal: 20, detail: 'Condition 20 <= 20 True → prints "20 ", $i = 22 (stops)' },
    ],
  },
  {
    id: 'while-odd-1-to-15',
    numberLabel: '3',
    category: 'while-loop',
    categoryLabel: 'While Loop – Practical Questions',
    title: '3. Print odd numbers from 1 to 15',
    questionPrompt: 'Print odd numbers from 1 to 15 using a while loop.',
    code: `<?php
$i = 1;

while ($i <= 15) {
    echo $i . " ";
    $i = $i + 2;
}
?>`,
    output: '1 3 5 7 9 11 13 15',
    stepsPreview: [
      { iteration: 1, iVal: 1, detail: 'Starts at $i = 1 → prints "1 ", $i = 1 + 2 = 3' },
      { iteration: 2, iVal: 3, detail: 'Condition 3 <= 15 True → prints "3 ", $i = 3 + 2 = 5' },
      { iteration: 8, iVal: 15, detail: 'Condition 15 <= 15 True → prints "15 ", $i = 17 (stops)' },
    ],
  },
  {
    id: 'while-table-of-5',
    numberLabel: '4',
    category: 'while-loop',
    categoryLabel: 'While Loop – Practical Questions',
    title: '4. Print multiplication table of 5',
    questionPrompt: 'Print the multiplication table of 5 using a while loop.',
    code: `<?php
$i = 1;

while ($i <= 10) {
    echo "5 x " . $i . " = " . (5 * $i) . "<br>";
    $i++;
}
?>`,
    output: `5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50`,
    extraNotes: [
      'Short Practical File Output Notation:',
      '5 x 1 = 5',
      '5 x 2 = 10',
      '...',
      '5 x 10 = 50',
    ],
  },
  {
    id: 'while-reverse-10-to-1',
    numberLabel: '5',
    category: 'while-loop',
    categoryLabel: 'While Loop – Practical Questions',
    title: '5. Print numbers from 10 to 1 in reverse order',
    questionPrompt: 'Print numbers from 10 to 1 in reverse order using a while loop.',
    code: `<?php
$i = 10;

while ($i >= 1) {
    echo $i . " ";
    $i--;
}
?>`,
    output: '10 9 8 7 6 5 4 3 2 1',
    stepsPreview: [
      { iteration: 1, iVal: 10, detail: 'Starts at $i = 10 → prints "10 ", $i-- makes it 9' },
      { iteration: 2, iVal: 9, detail: 'Condition 9 >= 1 True → prints "9 ", $i-- makes it 8' },
      { iteration: 10, iVal: 1, detail: 'Condition 1 >= 1 True → prints "1 ", $i-- makes it 0 (stops)' },
    ],
  },
  {
    id: 'do-while-1-to-10',
    numberLabel: '6',
    category: 'do-while-loop',
    categoryLabel: 'Do-While Loop – Practical Questions',
    title: '6. Print numbers from 1 to 10',
    questionPrompt: 'Print numbers from 1 to 10 using a do-while loop.',
    code: `<?php
$i = 1;

do {
    echo $i . " ";
    $i++;
} while ($i <= 10);
?>`,
    output: '1 2 3 4 5 6 7 8 9 10',
  },
  {
    id: 'do-while-even-2-to-20',
    numberLabel: '7',
    category: 'do-while-loop',
    categoryLabel: 'Do-While Loop – Practical Questions',
    title: '7. Print even numbers from 2 to 20',
    questionPrompt: 'Print even numbers from 2 to 20 using a do-while loop.',
    code: `<?php
$i = 2;

do {
    echo $i . " ";
    $i = $i + 2;
} while ($i <= 20);
?>`,
    output: '2 4 6 8 10 12 14 16 18 20',
  },
  {
    id: 'do-while-table-of-2',
    numberLabel: '8',
    category: 'do-while-loop',
    categoryLabel: 'Do-While Loop – Practical Questions',
    title: '8. Print multiplication table of 2',
    questionPrompt: 'Print the multiplication table of 2 using a do-while loop.',
    code: `<?php
$i = 1;

do {
    echo "2 x " . $i . " = " . (2 * $i) . "<br>";
    $i++;
} while ($i <= 10);
?>`,
    output: `2 x 1 = 2
2 x 2 = 4
2 x 3 = 6
2 x 4 = 8
2 x 5 = 10
2 x 6 = 12
2 x 7 = 14
2 x 8 = 16
2 x 9 = 18
2 x 10 = 20`,
    extraNotes: [
      'Short Practical File Output Notation:',
      '2 x 1 = 2',
      '2 x 2 = 4',
      '...',
      '2 x 10 = 20',
    ],
  },
  {
    id: 'do-while-reverse-10-to-1',
    numberLabel: '9',
    category: 'do-while-loop',
    categoryLabel: 'Do-While Loop – Practical Questions',
    title: '9. Print numbers from 10 to 1 in reverse order',
    questionPrompt: 'Print numbers from 10 to 1 in reverse order using a do-while loop.',
    code: `<?php
$i = 10;

do {
    echo $i . " ";
    $i--;
} while ($i >= 1);
?>`,
    output: '10 9 8 7 6 5 4 3 2 1',
  },
  {
    id: 'do-while-hello-php',
    numberLabel: '10',
    category: 'do-while-loop',
    categoryLabel: 'Do-While Loop – Practical Questions',
    title: '10. Print "Hello PHP" 5 times',
    questionPrompt: 'Print "Hello PHP" 5 times using a do-while loop.',
    code: `<?php
$i = 1;

do {
    echo "Hello PHP<br>";
    $i++;
} while ($i <= 5);
?>`,
    output: `Hello PHP
Hello PHP
Hello PHP
Hello PHP
Hello PHP`,
  },
  {
    id: 'factorial-while-loop',
    numberLabel: 'Factorial',
    category: 'factorial',
    categoryLabel: 'Factorial',
    title: 'PHP Program to Find Factorial Using While Loop',
    code: `<?php
$n = 5;
$fact = 1;
$i = 1;

while ($i <= $n) {
    $fact = $fact * $i;
    $i++;
}

echo "Factorial of $n = $fact";
?>`,
    output: 'Factorial of 5 = 120',
    extraNotes: [
      'Logic:',
      '5! = 5 × 4 × 3 × 2 × 1 = 120 ✅',
    ],
    vivaNote: 'Viva: Factorial of a number n is the product of all positive integers from 1 to n',
    stepsPreview: [
      { iteration: 1, iVal: 1, detail: '$fact = 1 * 1 = 1, $i becomes 2' },
      { iteration: 2, iVal: 2, detail: '$fact = 1 * 2 = 2, $i becomes 3' },
      { iteration: 3, iVal: 3, detail: '$fact = 2 * 3 = 6, $i becomes 4' },
      { iteration: 4, iVal: 4, detail: '$fact = 6 * 4 = 24, $i becomes 5' },
      { iteration: 5, iVal: 5, detail: '$fact = 24 * 5 = 120, $i becomes 6 (loop ends)' },
    ],
  },
];

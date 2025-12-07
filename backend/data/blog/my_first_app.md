---
name: My First App Taught Me Everything Except How to Code
handle: my-first-app-taught-me-everything-except-how-to-code
date: "2025-12-07"
---

The first real app I ever built wasn’t meant for users. It wasn’t meant for a portfolio. It wasn’t even meant to be “good.”

It existed for one reason:  
I wanted to stop being scared of writing bad code.

For years I had convinced myself that I couldn’t build anything until I had learned *everything*. Every time I started a new tutorial, I told myself I wasn’t ready yet. I needed to study more, watch more videos, read more docs. By the time I felt “ready,” the technology had already changed.

So my first app wasn’t a project—it was a challenge to my own perfectionism.

I decided to build the simplest possible thing: a tiny note-taking tool that saved everything into `localStorage`. No backend. No users. No authentication. Just a text box and a save button.

The moment I started coding, something strange happened:  
I kept trying to architect the entire future of the app before writing the first line.  
“What if I add tags?”  
“What if I sync it across devices?”  
“What if millions of people use it?”

Millions of people were not going to use it.  
I didn’t even know if *I* would use it.

Still, the same fear returned: *what if I build the wrong thing?*

So I made myself a deal: **every time I overthought something, I wrote the worst solution first**, intentionally. If something bothered me later, I'd fix it then.

Suddenly the app started taking shape.

The UI looked terrible.  
The code looked worse.  
But it *worked*, and for the first time, that was enough.

Then something surprising happened:  
as soon as I stopped caring about building the “right” thing, I finally had the freedom to experiment. I tried new patterns, deleted old ones, rewrote features, and broke the app at least a dozen times.

It was the most fun I’d ever had programming.

And in that messy little app—completely unfit for users, employers, or GitHub stars—I learned lessons no tutorial had ever taught me:

- Shipping bad code teaches you more than reading good code.  
- Every “refactor” begins with something embarrassing.  
- Ideas don’t need permission to exist.  
- The fastest way to learn is to build something you are not ready for.

Eventually, the note-taking app reached the point where it wasn’t interesting anymore. I didn’t publish it. I didn’t polish it. I didn’t even keep the repo private—it just lived in a forgotten folder on my laptop.

But it did something far more important:  
it took away the fear of beginning.

## A screenshot is all that remains

All I have left of that app is a blurry screenshot I once sent to a friend.  
It looks awful.  
It also represents the moment I stopped *studying programming* and started *being a programmer*.

![](/assets/my-first-app-screenshot.png)

## A relic from the early days

Inside that old folder is a file simply named `app.js`.  
The first 15 lines still make me laugh:

```js
// I have no idea what I'm doing
function saveNote() {
  const t = document.getElementById("note").value;
  localStorage.setItem("note", t);
  alert("Saved. Somehow.");
}
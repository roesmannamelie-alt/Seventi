# Design rationale

A few paragraphs on the decisions behind the Figma file and the two landing pages,
written for the developer who will build them and for anyone reviewing the design.

## Tokens come from the rendered pages, not from the stylesheet

The CSS uses `clamp()` for almost every type size, so a value like
`clamp(46px, 4.3vw, 64px)` has no single number a designer can hand over. Rather than
copy the clamp into Figma, both landing pages were rendered at 1440 px and at 390 px
and the computed values were read off the live layout. The type scale in Figma is
therefore what a browser actually produces at those two widths, not an approximation:
the H1 is 62/62.5 with -6 % tracking on desktop and 34/36.7 with -4.5 % on mobile.

That is also why the file carries two complete sets of text styles, `Desktop/` and
`Mobil/`, instead of one set that gets resized by hand. The two breakpoints are not the
same ramp at different sizes. Tracking tightens as the type grows, line height ratios
differ, and a few elements change weight. Splitting them keeps the handoff honest and
makes it obvious which value belongs to which viewport.

## Colour is split into brand, derived and functional

Only four colours come from the brand guidelines: dark green `#162800`, vibrant yellow
`#D6FF21`, white and black. A website needs more than four. The variable collection
separates them so nobody mistakes one for the other. `Marke/` holds the four official
values. `Ton/` holds the derived greens that carry states and small text, for example
`#315500` for type on a light green surface, because the vibrant yellow is unreadable
as text. `Flaeche/`, `Text/` and `Linie/` hold the functional tones for section grounds,
muted copy and hairlines. Every variable carries a description saying what it is for.

Two deviations were corrected along the way. The lime was one digit off, `#d6ff20`
instead of `#D6FF21`, and the footer ran on a second, deeper green that the guidelines
do not contain. Both now match the guidelines exactly. The main call to action on the
planner page was pure black with a grey border; the guidelines allow black only when
dark green is not possible, and here it was, so it is dark green now.

## The search field is the page, not a section of it

The provider brief makes the search the primary action and says the not-found case is
the likely one. The design follows that literally. There is no sign-up button anywhere.
The search sits inside the hero photograph, in a white card in a frosted frame, which
makes it the single brightest object on the screen. Its label names both outcomes before
anyone types: already listed, take over your profile; not listed yet, create one for
free. Both outcomes lead into the same form, and the not-found panel says in so many
words that this is the normal case and the directory is still being built.

The removal path is deliberately as visible as the claim path. "Eintrag entfernen" sits
next to "Profil übernehmen" at the same weight, and it works without signing in. That
is the part of the product that has to be credible, so hiding it would defeat the page.

## Conversion is carried by a thin bar, not by more sections

Between the hero and the closing block the provider page runs about 7000 pixels with no
way to act. Rather than repeat the search field three times, a slim bar appears once the
hero scrolls out and disappears again when the closing block arrives, because the search
is already there. One more prompt sits directly after the pricing section, which is where
the decision actually gets made. Neither opens a new search; both scroll to the existing
one and put the cursor in the field. The planner page uses the same bar.

## What the file contains

Three pages, forced by the plan limit but workable: foundations and components, then one
page per landing page holding both the 1440 and the 390 frame. Colour, radius and spacing
live as variables so a developer can read the intended token rather than a hex value.
Components carry descriptions with the real numbers, for example the button as height 46,
padding 22, pill radius.

## States are variants, not second frames

The FAQ is the one place on the provider page where the same element has two
appearances. It is modelled as a component set `FAQ-Zeile` with the property
`Zustand = Zu / Offen`: closed is a white circle with a plus on `#f4f7f0`, open
is a lime circle with the same sign rotated 45 degrees on `#eef3e6`, with the
answer set to 560 below it. The same rule applies to anything else with a state:
it becomes a variant, never a second page frame parked next to the first.

The page frame shows the state the live page actually loads with, because the
frame doubles as the measurement a developer reads heights off. All eight rows
are therefore closed, and the search result shows one path, not both. An earlier
draft left the first row open so an answer was visible without clicking; that
made the section 970 px against 876 px on the live page, and a section that
lies about its height is worse than one that needs a click to read.

The 390 frame had been left behind on both counts. Its FAQ rows still carried
their answers and its search result still stacked both paths inside one browser
window, which put that section at 2015 px against 1114 px and the switch section
at 1469 px against 953 px. Everything below the second section therefore sat
roughly 500 px too low, 1400 px by the footer. Both frames now match. Nothing
was lost in the process: the answers and the second path already sit on `States`,
and a 390 copy of them would be exactly the duplicate the rule above forbids.

What a variant cannot carry is the per-instance text. The closed row holds one
text layer, the question, so switching eight instances to `Zu` would drop eight
answers out of the file. They sit on a board named `States`, to the right of and
outside the page frame, next to the second search path for the same reason. That
board is an annex holding content, not an alternative page — the rule above still
stands, and nothing in it is a duplicate of a frame that exists elsewhere.

The wordmark is a component set too, `Wortmarke` with `Ton = Dunkel / Weiss`, so
the footer version is not a second copy of the same paths.

## Five things that bite when redrawing HTML in Figma

Circles collapse. A round frame inside auto-layout that is left on hug shrinks to
the width of its content, so a 34 px step number becomes 13 px wide and stops
being round. Round elements need an explicit fixed size on both axes.

Spacing cannot be read off the stylesheet. A grid column is wider than the box
inside it, and the two words in the primary button sit 6 px apart without any
`gap` rule saying so. `figma/messwerkzeug` therefore derives every spacing from
the measured positions of the rendered page rather than from the CSS.

Icon strokes need centre alignment. An SVG stroke always straddles its path, so
the dash in `M7 12h10` puts half its 1.8 px on either side of the line. Figma
imports such a vector on `INSIDE` alignment, which has nowhere to sit on a path
that encloses no area: the four dashes in the comparison list came out as small
boxes, and the arrows in the `Der Unterschied` kicker collapsed into two specks.
Every stroked icon vector in the file is set to `CENTER` for that reason, 201 of
them, and anything drawn later has to be set the same way.

A closed element can end up wearing the open state. `.faq-toggle` is a white
26 px circle with a plus in `#315500`; the stylesheet turns it lime and rotates
it 45 degrees only once the row opens. The 390 rows were drawn from that second
appearance, so eight closed rows carried a lime circle with a cross on it. The
rule this leaves behind: when a stylesheet produces a state with `transform`
rather than with a different element, the closed drawing has to be built from the
closed values, not from a rotated copy of the open one.

Pseudo-elements are invisible to the measuring tool. `figma/messwerkzeug` reads
positions off the rendered page through the DOM, and `::before` and `::after`
have no node in it. The white field that marks the selected side of the
`wege-switch` is such a pseudo-element, so it was missing from both frames while
the two labels around it measured correctly. Anything drawn as `content: ""` has
to be read out of the stylesheet by hand: here `top/bottom/left: 4px, right: 50%`
against a 350 px bar, which is a 171 × 44 field on a radius of 22.

## What is not in the design

No provider counts, no planner numbers, no response times, no testimonials, no client
logos on the provider page. The brief forbids invented proof and asks to remove an element
rather than fill it with a made-up number, so the page has no trust bar at all. The one
exception is the example profile, which carries placeholder capacity and prices and is
labelled as an example twice. It needs to be replaced with a real profile before launch.

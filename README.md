Autolink Filter for Drupal 7
============================

Allows AJAXified search for user and node names, and creates links out of them.

Typing a @ and a few letter initiates a search of users and nodes. The user can
select an autocomplete option, which is converted to a link on display. Allows
spaces in user names or titles. HTML anchor should be allowed for the input.

Degrades to simple server side link creation if there is no JavaScript support.

As of now, it has some hard-coded elements for the site it is intended for, but
will likely be generalized and released to drupal.org at some point.

Requires Better Autocomplete jQuery plugin by Betamos:
https://github.com/betamos/Better-Autocomplete

Copy jquery.better-autocomplete.js and better-autocomplete.css to the module
folder (code uses .min version).

Autolink Filter for Drupal 7
============================

Allows AJAXified search for user and node names.

Typing a @ will show an <input> in place, and initiates a search of users and nodes. The user can select an autocomplete option, which is converted to a link on display. Allows spaces in user names or titles. Intended for use with HTML inputs.

Degrades to simple server side link creation if there is no JavaScript support.

Requires Better Autocomplete jQuery plugin by Betamos:
https://github.com/betamos/Better-Autocomplete

Copy jquery.better-autocomplete.js and better-autocomplete.css to the module folder
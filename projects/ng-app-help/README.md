# NgAppHelp

NgAppHelp is simple angular 2+ library the provides a great way to provide your users in-app help.  The user experience is to provide help button that when pressed, highlights all elements that have attached help.  The user can then hover over those 'help enabled' elements and see detailed help as a modal.

![Demo Image](https://github.com/JeffPlummer/ng-shared-libs/blob/master/projects/ng-app-help/assets/help_demo.gif)

## Install
npm install @plummer-libs/ng-app-help

## Usage

### Directive: ***ngAppHelpEnablerButton***
Attach this attribute directive to the button that should enable the help system.

#### Attributes:
<table>
<tr><td>Name</td><td>Type</td><td>Description</td></tr>
<tr>
<td>helpTemplate</td>
<td>String</td>
<td>An NgTemplate that should be displayed the first time the user clicks the help system.  Typically you will want to explain how help works and they can hover over highlighted items to get detailed help.</td>
</tr>
</table> 

#### Events
<table>
<tr><td>Name</td><td>Description</td></tr>
<tr>
<td>click</td>
<td>Enables the help system.  If this is the first time clicked it will show first time help.</td>
</tr>
<tr>
<td>dblclick</td>
<td>Shows first time help regardless of whether they've seen it already.</td>
</tr>
</table> 

#### Example Usage:
```html
<button ngAppHelpEnablerButton [helpTemplate]='firstTime'>Enable Help Button</button>
<ng-template #firstTime>
  <div>This is some first time help.</div>
  <div>  Normally I'd put instructions here on how the help system works.</div>
</ng-template>
```



### Directive: ***ngAppHelpEnabled***
Attach this directive to any HTML element you want to attach help.
#### Attributes:
<table>
<tr><td>Name</td><td>Type</td><td>Description</td></tr>
<tr>
<td>highlightClass</td>
<td>String</td>
<td>Class to use to highlight this element as 'help enabled' when user clicks the 'ngAppHelpEnablerButton' button.</td>
</tr>
<tr>
<td>helpTemplate</td>
<td>String</td>
<td>NgTemplate to render as a modal to show detailed help for that element.</td>
</tr>
</table> 


#### Events
<table>
<tr><td>Name</td><td>Description</td></tr>
<tr>
<td>mouseover</td>
<td>When the user hovers over the element for 500 ms it will show help. </td>
</tr>
<tr>
<td>mouseout</td>
<td></td>
</tr>
</table> 


#### Example Usage:
```html
<button ngAppHelpEnabled 
        [highlightClass]="'my_highlight'"
        [helpTemplate]="myElementHelpTemplate"
        (click)="doSomething()">Test Button</button>
<ng-template #myElementHelpTemplate>
  <div>This is a template that would show help on how to use this element</div>
</ng-template>
```


###Service: NgAppHelpService
Used to communicate between the directives.  But can be used directly to get the current state, or trigger help enable.

#### Api
<table>
<tr><td>Name</td><td>Description</td></tr>
<tr>
<td>appHelpEnabled$</td>
<td>Observable that emits the state of whether help is currently enabled. </td>
</tr>
<tr>
<td>setAppHelpEnabled(e: boolean)</td>
<td>Sets the help enabled state.</td>
</tr>
<tr>
<td>getAppHelpEnabled(): boolean</td>
<td>Gets the help enabled state.</td>
</tr>
</table> 


###Example:
```html
<button ngAppHelpEnablerButton [helpTemplate]='firstTime'>Enable Button</button>
<ng-template #firstTime>
  <div>This is some first time help.  Normally I'd put instructions here on how the help system works.</div>
</ng-template>


<button ngAppHelpEnabled
        [highlightClass]="'my_highlight'"
        [helpTemplate]="myElementHelpTemplate"
        (click)="doSomething()">Test Button</button>
<ng-template #myElementHelpTemplate>
  <div>This is a template that would show help on how to use this element</div>
</ng-template>

<div ngAppHelpEnabled
     [highlightClass]="'my_highlight'"
     [helpTemplate]="myOtherHelpTemplate">
  Here's some text that for some reason requires detailed help.
</div>
<ng-template #myOtherHelpTemplate>
  <div>It's text.  Just read it.  Help complete.</div>
</ng-template>

```

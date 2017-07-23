---
author: kirm
categories: Matlab Emacs
date: '2017-06-14 mer. 11:54'
description: |
    This is how I use Matlab and Emacs together everyday to get a similar
    workflow as for other programming languages (C/C++, python etc.).
layout: post
options: 'H:2 num:nil tags:nil toc:nil timestamps:t'
startup: showall
title: Create full applications in Matlab with Emacs
...

Getting Matlab to work with Emacs
=================================

First of all you will need to get Matlab inside Emacs. Happily for you,
there is a project for that (like always...).

You can get it from MELPA: <kbd>M-x</kbd><kbd>package-install</kbd><kbd>matlab-mode</kbd>

Otherwise you can still get the source at
<https://sourceforge.net/p/matlab-emacs/src/ci/master/tree/>. And find
how to install it manually on the installation instructions of the
source.

First configuration
-------------------

You can customize some basic properties in your .emacs file. Here is an
example of the configuration in my .emacs. The

<kbd>matlab-shell-command</kbd> 

sets the path to the bin of your MATLAB installation, which enables you
to configure the version of MATLAB you want to choose if you have
multiple ones installed on your computer. You definitely want to add the
"-nodesktop -nosplash" options to the

<kbd>matlab-shell-command-switches</kbd> 

variable. You may notice that I have also added the "-softwareopengl".
You can do it if you have some issues for starting matlab with your
graphic card.

Finally, you can also add the so that when you run a script the current
MATLAB directory is automatically changed and the indentation is
enabled.

;; This is for the manual installation (add-to-list 'load-path
"\~/.emacs.d/include/matlab") (load-library "matlab-load") ;; Some
customization for MATLAB installation (setq matlab-shell-command
"/usr/local/MATLAB/R2016b/bin/matlab") (setq
matlab-shell-command-switches (list "-softwareopengl -nodesktop
-nosplash")) (setq matlab-indent-function t) (setq
matlab-change-current-directory t) ;; enable the matlab-mode for the .m
files (add-to-list 'auto-mode-alist '("\
.m\$" . matlab-mode)) ;; Enable CEDET (matlab-cedet-setup) ;; Add the
bin to load-path so that you can get the functions on CEDET (add-to-list
'load-path "/usr/local/MATLAB/R2016b/bin") ;; Enable flycheck for MATLAB
(eval-after-load 'flycheck '(require 'flycheck-matlab-mlint))

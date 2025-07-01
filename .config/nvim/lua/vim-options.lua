-- Setup Neovim
vim.opt.number = true                   -- Display line numbers
vim.opt.cursorline = true               -- Highlight cursor line
vim.opt.fillchars:append { eob = " " }  -- Hide '~' on empty buffer lines
vim.opt.wrap = false                    -- Disable wrap line
vim.opt.sidescroll = 1                  -- Scroll 1-char horizontally
vim.opt.sidescrolloff = 5               -- Keep 5-char margin
-- Set tab = 4 space
vim.opt.expandtab = true
vim.opt.tabstop = 4
vim.opt.softtabstop = 4
vim.opt.shiftwidth = 4
vim.opt.autoindent = true
-- Set color
vim.opt.termguicolors = true
-- Set leader
vim.g.mapleader = " "
vim.g.maplocalleader = "\\"
-- Resize pane
vim.keymap.set("n", "<A-=>", "<C-w>+", {})  -- Resize: taller
vim.keymap.set("n", "<A-->", "<C-w>-", {})  -- Resize: shorter
vim.keymap.set("n", "<A-.>", "<C-w><", {})  -- Resize: narrower
vim.keymap.set("n", "<A-,>", "<C-w>>", {})  -- Resize: wider
-- Move on pane
vim.keymap.set("n", "<C-Up>", "<C-w>k", {})     -- Move to upper pane
vim.keymap.set("n", "<C-Down>", "<C-w>j", {})   -- Move to bottom pane
vim.keymap.set("n", "<C-Left>", "<C-w>h", {})   -- Move to lèt pane
vim.keymap.set("n", "<C-Right>", "<C-w>l", {})  -- Move to right pane
-- Set move line
vim.keymap.set("v", "<A-Down>", ":m '>+1<CR>gv=gv", {})    -- Move line in Visual mode
vim.keymap.set("v", "<A-Up>", ":m '<-2<CR>gv=gv", {})      -- Move line in Visual mode
vim.keymap.set("n", "<A-Down>", ":m .+1<CR>", {})          -- Move line in Normal and Insert mode
vim.keymap.set("n", "<A-Up>", ":m .-2<CR>", {})            -- Move line in Normal and Insert mode
-- Indentation
vim.keymap.set("n", "<Tab>", ">>", { noremap = true, silent = true })       -- Normal mode -> Tab: indent
vim.keymap.set("n", "<S-Tab>", "<<", { noremap = true, silent = true })     -- Normal mode -> Shift-Tab: unindent
vim.keymap.set("v", "<Tab>", ">gv", { noremap = true, silent = true })      -- Visual mode -> Tab: indent
vim.keymap.set("v", "<S-Tab>", "<gv", { noremap = true, silent = true })    -- Visual mode -> Shift-Tab: unindent

{ pkgs ? import <nixpkgs> {}}:
let

  shell = pkgs.mkShell {
    nativeBuildInputs = [
      pkgs.nodejs-18_x
      pkgs.nodePackages.pnpm
    ];


    shellHook = ''
      export PATH=$PWD/bin:$PWD/bin/adr:$PWD/node_modules/.bin:$PATH
      export NODE_OPTIONS=--max_old_space_size=4096
      if [ ! -e .env ]; then
          ln -s packages/app/.env .env
      fi
    '';
  };

in shell


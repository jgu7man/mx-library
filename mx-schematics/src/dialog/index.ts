import {
  Rule, Tree, SchematicsException,
  apply, url, applyTemplates, move,
  chain, mergeWith
} from '@angular-devkit/schematics';

import { strings, normalize, virtualFs, workspaces } from '@angular-devkit/core';
import { Dialog as DialogSchema } from './schema';

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

export function dialog(options: DialogSchema): Rule {
  return async ( tree: Tree ) => {

    // await setupOptions(tree, options);
    options.flatName = options.name.slice( options.name.lastIndexOf( '/' ) + 1 )

    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace( '/', host );

    if (!options.project) {
      options.project = workspace.extensions.defaultProject as string;
    }

    const project = workspace.projects.get(options.project);
    if (!project) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }

    const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';

    if (!options.path) {
      options.path = `${project.sourceRoot}/${projectType}/${options.name}`;
    }


    console.log( options )
    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.flatName
      }),
      move(normalize(options.path as string))
    ] );

    return chain([
      mergeWith(templateSource)
    ]);

  };
}

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { handleSquirrelStartup } from '../electron/squirrel.ts';

test('ordinary launches and non-Windows platforms do not trigger installer hooks', () => {
  assert.equal(handleSquirrelStartup({ platform: 'linux', args: ['app', '--squirrel-install'] }), false);
  assert.equal(handleSquirrelStartup({ platform: 'win32', args: ['app', '--user-data-dir=/tmp'] }), false);
});

for (const [event, expected] of [
  ['--squirrel-install', '--createShortcut'],
  ['--squirrel-updated', '--createShortcut'],
  ['--squirrel-uninstall', '--removeShortcut'],
]) {
  test(event + ' performs the Squirrel shortcut action and exits', () => {
    const calls = [];
    const handled = handleSquirrelStartup({
      platform: 'win32',
      args: ['app', event],
      executablePath: 'C:\\Svitlo\\app-0.0.0\\svitlo.exe',
      run: (command, args, options) => {
        calls.push({ command, args, options });
        return { status: 0 };
      },
      exit: code => calls.push({ exit: code }),
    });
    assert.equal(handled, true);
    assert.equal(calls[0].args[0], expected);
    assert.deepEqual(calls[0].options, { windowsHide: true });
    assert.deepEqual(calls[1], { exit: 0 });
  });
}

test('obsolete events exit without Update.exe and failures propagate', () => {
  let exitCode;
  assert.equal(
    handleSquirrelStartup({
      platform: 'win32',
      args: ['app', '--squirrel-obsolete'],
      run: () => {
        throw Error('must not run');
      },
      exit: code => {
        exitCode = code;
      },
    }),
    true,
  );
  assert.equal(exitCode, 0);
  handleSquirrelStartup({
    platform: 'win32',
    args: ['app', '--squirrel-install'],
    run: () => ({ status: 1 }),
    exit: code => {
      exitCode = code;
    },
  });
  assert.equal(exitCode, 1);
});

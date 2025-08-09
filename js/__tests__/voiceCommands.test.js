let ShedOrganizer;

beforeAll(() => {
  document.addEventListener = jest.fn();
  ({ ShedOrganizer } = require('../app.js'));
});

describe('processVoiceCommand', () => {
  let organizer;

  beforeEach(() => {
    organizer = Object.create(ShedOrganizer.prototype);
    organizer.saveLayout = jest.fn();
    organizer.loadLayout = jest.fn();
    organizer.toggleView = jest.fn();
    organizer.undo = jest.fn();
    organizer.redo = jest.fn();
    organizer.exportLayout = jest.fn();
    organizer.showToast = jest.fn();
  });

  test('calls saveLayout for "save layout" command', () => {
    organizer.processVoiceCommand('save layout');
    expect(organizer.saveLayout).toHaveBeenCalled();
  });

  test('calls toggleView for "toggle 3d" command', () => {
    organizer.processVoiceCommand('toggle 3d');
    expect(organizer.toggleView).toHaveBeenCalled();
  });

  test('unrecognized command triggers showToast', () => {
    organizer.processVoiceCommand('do something weird');
    expect(organizer.showToast).toHaveBeenCalledWith('🎤 Voice command not recognized');
  });
});

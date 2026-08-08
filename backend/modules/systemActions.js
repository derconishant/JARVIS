const { exec } = require("child_process");

async function systemActions(text) {

    if (text === "open task manager") {

        exec("taskmgr");

        return "Opening Task Manager.";
    }

    if (text === "open settings") {

        exec("start ms-settings:");

        return "Opening Settings.";
    }

    if (text === "open control panel" ) {

        exec("control");

        return "Opening Control Panel.";
    }

    if (text === "open device manager" || text === "open device manager") {

        exec("devmgmt.msc");

        return "Opening Device Manager.";
    }

    if (text === "open file explorer") {

        exec("explorer");

        return "Opening File Explorer.";
    }
if (text === "lock computer" || text === "lock pc" || text === "lock workstation") {

    exec("rundll32.exe user32.dll,LockWorkStation");

    return "Locking your computer.";

}
if (text === "restart computer" || text === "restart pc" || text === "reboot computer" || text === "reboot pc") {

    exec("shutdown /r /t 0");

    return "Restarting your computer.";

}
if (text === "sleep computer" || text === "sleep pc" || 
text === "put computer to sleep" || text === "put pc to sleep"
) {

    exec("rundll32.exe powrprof.dll,SetSuspendState 0,1,0");

    return "Putting computer to sleep.";

}
    return null;
}

module.exports = systemActions;
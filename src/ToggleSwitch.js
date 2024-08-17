import './ToggleSwitch.css'


class ToggleSwitch {

    constructor() {
        this.isChecked = false;
    }

    render() {
        return (
            <div>
                <input type="checkbox" onClick={() => { this.isChecked = !this.isChecked }} id="switch"/><label htmlFor="switch"></label>
            </div>
    );
    }
}

export default ToggleSwitch;

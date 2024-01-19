import "./Toggle.scss";

export const Toggle = ({ checked, handleSwitch }) => {
  return (
    <div>
      <label className="toggle-switch">
        <input
          type="checkbox"
          className="toggle-switch__input"
          checked={checked}
          onClick={handleSwitch}
        />
        <span className="toggle-switch__slider" />
      </label>
    </div>
  );
};

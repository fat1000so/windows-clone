import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../config/AppSettingsContext";
import { AppareanceSettings, NavbarSettings } from "../../types";
import { InputNumeric } from "../Inputs";

export const ConfigScreen = () => {
  const {
    onSetNavbarSettings,
    navbarSettings,
    interfaceSettings,
    onSetInterfaceSettings,
  } = useContext(PageContext);
  const [appareanceValues, setAppareanceValues] =
    useState<AppareanceSettings>();
  const [navbarValues, setNavbarValues] = useState<NavbarSettings>();

  useEffect(() => {
    setNavbarValues(navbarSettings);
    setAppareanceValues({
      background: interfaceSettings.background,
      fontFamily: interfaceSettings.fonts,
    });
  }, []);

  const handleChanges = (e: any) => {
    setNavbarValues({
      ...navbarSettings,
      [e.target.name]: e.target.value,
    });
  };

  const submitChanges = () => {
    if (!navbarValues) return;
    onSetNavbarSettings && onSetNavbarSettings(navbarValues);
  };

  return (
    <div className="config-screen">
      <div className="section-title">
        <h1>Navbar</h1>
      </div>
      {navbarValues && (
        <div className="section">
          <div className="input-group prefix">
            <label>Width: </label>
            <InputNumeric
              name="width"
              onChange={handleChanges}
              value={navbarValues.width}
              suffix="%"
            />
          </div>
          <div className="input-group">
            <label>Height: </label>
            <InputNumeric
              name="height"
              onChange={handleChanges}
              value={navbarValues.height}
              suffix="px"
            />
          </div>
          <div className="input-group">
            <label>HideNav: </label>
            <input
              type="checkbox"
              checked={navbarValues.hideNav}
              name="hideNav"
              onChange={handleChanges}
            />
          </div>
          <div className="input-group">
            <label>Position: </label>
            <select
              name="position"
              value={navbarValues.position}
              onChange={handleChanges}
            >
              <option value="BOTTOM">Bottom</option>
              <option value="TOP">Top</option>
            </select>
          </div>
        </div>
      )}
      <button onClick={submitChanges} disabled={!navbarValues}>
        Save changes
      </button>
      <div className="section-title">
        <h1>Appareance</h1>
      </div>
      {appareanceValues && (
        <div className="section">
          <div className="input-group prefix">
            <label>Background Image: </label>
            <input
              type="url"
              name="background"
              value={appareanceValues.background.backgroundString}
              onChange={(e) => {
                setAppareanceValues({
                  ...appareanceValues,
                  background: {
                    ...appareanceValues.background,
                    backgroundString: e.target.value,
                  },
                });
              }}
            />
          </div>
          <div className="input-group">
            <label>Repeat Background: </label>
            <select
              name="repeatBackground"
              value={appareanceValues.background.repeat}
              onChange={(e) => {
                setAppareanceValues({
                  ...appareanceValues,
                  background: {
                    ...appareanceValues.background,
                    // @ts-ignore
                    repeat: e.target.value,
                  },
                });
              }}
            >
              <option value="repeat">Repeat</option>
              <option value="no-repeat">No repeat</option>
            </select>
          </div>
          <div className="input-group">
            <label>Position: </label>
            <select
              name="positionBackground"
              value={appareanceValues.background.position}
              onChange={(e) => {
                setAppareanceValues({
                  ...appareanceValues,
                  background: {
                    ...appareanceValues.background,
                    // @ts-ignore
                    position: e.target.value,
                  },
                });
              }}
            >
              <option value="center">Center</option>
            </select>
          </div>
          <div className="input-group">
            <label>Size: </label>
            <select
              name="sizeBackground"
              value={appareanceValues.background.size}
              onChange={(e) => {
                setAppareanceValues({
                  ...appareanceValues,
                  background: {
                    ...appareanceValues.background,
                    // @ts-ignore
                    size: e.target.value,
                  },
                });
              }}
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
            </select>
          </div>
          <div className="input-group">
            <label>Font Family: </label>
            <select
              name="fontFamily"
              value={appareanceValues.fontFamily.fontFamily}
              onChange={(e) => {
                setAppareanceValues({
                  ...appareanceValues,
                  fontFamily: {
                    ...appareanceValues.fontFamily,
                    // @ts-ignore
                    fontFamily: e.target.value,
                  },
                });
              }}
            >
              <option value="SYSTEM">System</option>
              <option value="NOTO_SANS">Noto Sans</option>
              <option value="ROBOTO">Roboto</option>
              <option value="MONTSERRAT">Montserrat</option>
            </select>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          if (!appareanceValues) return;
          onSetInterfaceSettings &&
            onSetInterfaceSettings({
              ...interfaceSettings,
              background: appareanceValues.background,
              fonts: appareanceValues.fontFamily,
            });
        }}
        disabled={!appareanceValues}
      >
        Save changes
      </button>
    </div>
  );
};

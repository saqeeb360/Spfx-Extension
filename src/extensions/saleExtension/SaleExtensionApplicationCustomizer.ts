import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'SaleExtensionApplicationCustomizerStrings';
import styles from './SaleExtensionApplicationCustomizer.module.scss';
const LOG_SOURCE: string = 'SaleExtensionApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ISaleExtensionApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class SaleExtensionApplicationCustomizer
  extends BaseApplicationCustomizer<ISaleExtensionApplicationCustomizerProperties> {

  private _topPlaceholder: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {

    this.context.placeholderProvider.changedEvent.add(this, this.CustomHeader);
    return Promise.resolve();
  }

  /**
   * CustomHeader
   */
  public CustomHeader() {
    // console.log(this.context.placeholderProvider.placeholderNames);
    // this.context.placeholderProvider.placeholderNames.map((placeholdername) => {
    //   console.log(PlaceholderName[placeholdername]);
    // });

    // let script:any = '<script>document.getElementsByClassName("root-42")[0].style["display"] = "none" </script>';
    const logoUrl: any = require('./assets/images.png');
    const banner: any = require('./assets/banner.gif');
    let userName: any = this.context.pageContext.user.displayName;
    if (!userName) {
      userName = "Guest";
    }
    console.log(banner);
    // Html header starts here
    if (!this._topPlaceholder) {
      this._topPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
      if (!this._topPlaceholder) {
        console.error("The expected placeholder (Top) was not found.");
        return;
      }
      if (this.properties) {
        let topString: string = this.properties.testMessage;
        if (!topString) {
          topString = "Welcome!";
        }
        if (this._topPlaceholder.domElement) {
          this._topPlaceholder.domElement.innerHTML = `
          <div class="${styles.app}">
            <div class="${styles.logoContainer}">
              <img alt="logo2" src="${logoUrl}" class="${styles.image}">
              <h4 class="${styles.imgtext}">Welcome ${userName}</h4>
            </div>
            <ul class="${styles.navArea}">
              <li><a href="https://spsalesproject.sharepoint.com/sites/Jaguar">HOME</a></li>
              <li><a href="https://spsalesproject.sharepoint.com/sites/Jaguar/SitePages/Orderpage.aspx">ORDER NOW</a></li>
              <li><a href="https://spsalesproject.sharepoint.com/sites/Jaguar/Lists/Products/AllItems.aspx">VEHICLES</a></li>
              <li><a href="https://spsalesproject.sharepoint.com/sites/Jaguar/Lists/Customers/AllItems.aspx">CUSTOMERS</a></li>
            </ul>
          </div>
           `;
        }
      }
    }
    // Html footer starts here
    if (!this._bottomPlaceholder) {
      this._bottomPlaceholder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Bottom,
        { onDispose: this._onDispose }
      );
      // The extension should not assume that the expected placeholder is available.
      if (!this._bottomPlaceholder) {
        console.error("The expected placeholder (Bottom) was not found.");
        return;
      }

      if (this.properties) {
        let bottomString: string = "© Jaguar Land Rover 2021";
        if (!bottomString) {
          bottomString = "© Jaguar Land Rover 2021";
        }

        if (this._bottomPlaceholder.domElement) {
          this._bottomPlaceholder.domElement.innerHTML = `
          <div class="${styles.bottom1}">
            <h3>© Copyright Jaguar Land Rover 2021</h3>
            <ul class="${styles.socialcontainer}">
              <li>
                <a href="#" class="${styles.facebook}"></a>
              </li>
              <li>
                <a href="#" class="${styles.twitter}"></a>
              </li>
              <li>
                <a href="#" class="${styles.insta}"></a>
              </li>
            </ul>
            </div>
        `;
        }
      }
    }
  }
  // <img alt="logo" src="Jaguar/SiteAssets/images.png" width="100">

  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}

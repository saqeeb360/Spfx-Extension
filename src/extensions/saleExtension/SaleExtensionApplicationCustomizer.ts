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
    let userName : any = this.context.pageContext.user.displayName; 
    if(!userName){
      userName = "Guest";
    }
    console.log(banner);
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
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
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

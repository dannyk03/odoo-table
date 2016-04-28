package com.tablet;

import com.facebook.react.ReactActivity;
import com.auth0.lock.react.LockReactPackage;
import io.realm.react.RealmReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.remobile.splashscreen.RCTSplashScreenPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import me.neo.react.StatusBarPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.microsoft.codepush.react.CodePush;
import com.eguma.barcodescanner.BarcodeScanner;
import com.bitgo.randombytes.RandomBytesPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "tablet";
    }

    /**
     * Returns whether dev mode should be enabled.
     * This enables e.g. the dev menu.
     */
    @Override
    protected boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
    }

    // 2. Override the getJSBundleFile method in order to let
    // the CodePush runtime determine where to get the JS
    // bundle location from on each app start
    @Override
    protected String getJSBundleFile() {
        return CodePush.getBundleUrl();
    }

    /**
     * A list of packages used by the app. If the app uses additional views
     * or modules besides the default ones, add more packages here.
     */
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new RandomBytesPackage(),
            new LockReactPackage(),
            new BarcodeScanner(),
            new RealmReactPackage(),
            new CodePush("gkuagDxk5gnEDnDwdZmfTr-tlLasNk9RjKD1-", this, BuildConfig.DEBUG),
            new VectorIconsPackage(),
            new RCTSplashScreenPackage(this),
            new StatusBarPackage(this),
            new ReactNativeConfigPackage()
        );
    }
}

package com.b7.b7connect;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import android.view.WindowManager;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "B7Connect";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      // SplashScreen.show(this);
      super.onCreate(savedInstanceState);
      getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
  }
}

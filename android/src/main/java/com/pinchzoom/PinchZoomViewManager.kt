package com.pinchzoom

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.PinchZoomViewManagerInterface
import com.facebook.react.viewmanagers.PinchZoomViewManagerDelegate

@ReactModule(name = PinchZoomViewManager.NAME)
class PinchZoomViewManager : SimpleViewManager<PinchZoomView>(),
  PinchZoomViewManagerInterface<PinchZoomView> {
  private val mDelegate: ViewManagerDelegate<PinchZoomView>

  init {
    mDelegate = PinchZoomViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<PinchZoomView>? {
    return mDelegate
  }

  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): PinchZoomView {
    return PinchZoomView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: PinchZoomView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "PinchZoomView"
  }
}

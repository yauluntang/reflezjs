LOCAL_PATH := $(call my-dir)

include $(CLEAR_VARS)

LOCAL_MODULE := cocos2djs_shared

LOCAL_MODULE_FILENAME := libcocos2djs

LOCAL_SRC_FILES := hellojavascript/main.cpp \
../../../Classes/AppDelegate.cpp \
../../../Classes/PluginSdkboxAdsJS.cpp \
../../../Classes/PluginSdkboxAdsJS.hpp \
../../../Classes/PluginSdkboxAdsJSHelper.cpp \
../../../Classes/PluginSdkboxAdsJSHelper.h \
../../../Classes/SDKBoxJSHelper.cpp \
../../../Classes/SDKBoxJSHelper.h

LOCAL_CPPFLAGS := -DSDKBOX_ENABLED \
-DSDKBOX_COCOS_CREATOR
LOCAL_LDLIBS := -landroid \
-llog
LOCAL_C_INCLUDES := $(LOCAL_PATH)/../../../Classes
LOCAL_WHOLE_STATIC_LIBRARIES += PluginSdkboxAds
LOCAL_WHOLE_STATIC_LIBRARIES += sdkbox

LOCAL_STATIC_LIBRARIES := cocos2d_js_static

LOCAL_EXPORT_CFLAGS := -DCOCOS2D_DEBUG=2 \
-DCOCOS2D_JAVASCRIPT

include $(BUILD_SHARED_LIBRARY)

$(call import-add-path, $(LOCAL_PATH)/../../../../cocos2d-x)
$(call import-add-path, $(LOCAL_PATH))
$(call import-module, cocos/scripting/js-bindings/proj.android)
$(call import-module, ./sdkbox)
$(call import-module, ./pluginsdkboxads)

//
//  RNViewController.m
//  Popong
//
//  Created by zhangheng on 2017/3/19.
//  Copyright © 2017年 zhangheng. All rights reserved.
//

#import "RNViewController.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

@implementation RNViewController {
    CGFloat lastAlpha;
    BOOL statusBarHidden;
    BOOL navigtaionBarHidden;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    NSURL *jsCodeLocation;
//    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
//    jsCodeLocation = [NSURL URLWithString:@"http://192.168.31.182:8081/index.ios.bundle?platform=ios&dev=true&minify=false"];
    
    jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"./bundle/index.ios" withExtension:@"jsbundle"];;
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"Popong"
                                                 initialProperties:nil
                                                     launchOptions:nil];
    rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
    self.view = rootView;
    [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)viewDidDisappear:(BOOL)animated {
    [[UIApplication sharedApplication] setStatusBarHidden:NO];
}

@end

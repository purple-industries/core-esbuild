import { constructor } from "@southside-shared/util/IConstructor";
import { injectable, singleton } from "tsyringe";

export const Singleton = (targetConstructor: constructor<any>) => {
	singleton()(targetConstructor);
	return targetConstructor;
};

export const Injectable = (targetConstructor: constructor<any>) => {
	injectable()(targetConstructor);
	return targetConstructor;
};

export const Component = (targetConstructor: constructor<any>) =>
	Singleton(targetConstructor);

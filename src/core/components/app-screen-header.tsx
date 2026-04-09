import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

import { useAppTheme } from "@/src/core/theme/paper-theme";

export function AppScreenHeader() {
  const theme = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.editorial.surfaces.canvas,
          paddingTop: 12,
          paddingBottom: 12,
        },
      ]}
    >
      <View
        style={[
          styles.barShell,
          { borderRadius: theme.editorial.radii.pill, overflow: "hidden" },
        ]}
      >
        <BlurView
          intensity={theme.editorial.blur}
          tint={theme.dark ? "dark" : "light"}
          style={[
            styles.barContent,
            {
              backgroundColor: theme.editorial.glass,
              paddingHorizontal: theme.editorial.spacing.sm,
              paddingVertical: 8,
            },
          ]}
        >
          <Pressable
            accessibilityRole="button"
            hitSlop={8}
            style={[styles.iconButton]}
          >
            <MaterialCommunityIcons
              name="menu"
              size={28}
              color={theme.colors.onSurface}
            />
          </Pressable>

          <Text
            variant="titleLarge"
            style={[styles.appName, { color: theme.colors.onSurface }]}
          >
            OPUS XII
          </Text>

          <View
            style={[
              styles.avatar,
              {
                backgroundColor: theme.editorial.surfaces.section,
                borderRadius: theme.editorial.radii.pill,
              },
            ]}
          >
            <Text
              variant="labelMedium"
              style={{ color: theme.colors.onSurface }}
            >
              XII
            </Text>
          </View>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 10,
  },
  barShell: {
    width: "100%",
  },
  barContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  appName: {
    flex: 1,
    textAlign: "center",
    fontWeight: 900,
    letterSpacing: -1.8,
  },
  avatar: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});

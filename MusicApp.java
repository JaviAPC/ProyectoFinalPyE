// Interfaz común para la reproducción de música
interface MusicPlayer {
    void play();
}

// Implementación concreta de la reproducción de música
class SimpleMusicPlayer implements MusicPlayer {
    @Override
    public void play() {
        System.out.println("Playing music");
    }
}

// Decorador abstracto para agregar efectos a la reproducción de música
abstract class MusicPlayerDecorator implements MusicPlayer {
    protected MusicPlayer musicPlayer;

    public MusicPlayerDecorator(MusicPlayer musicPlayer) {
        this.musicPlayer = musicPlayer;
    }

    @Override
    public void play() {
        musicPlayer.play();
    }
}

// Decorador concreto que agrega un efecto de ecualización
class EqualizerDecorator extends MusicPlayerDecorator {
    public EqualizerDecorator(MusicPlayer musicPlayer) {
        super(musicPlayer);
    }

    @Override
    public void play() {
        super.play();
        System.out.println("Applying equalizer effect");
    }
}

// Ejemplo de uso
public class MusicApp {
    public static void main(String[] args) {
        // Reproducir música simple
        MusicPlayer simplePlayer = new SimpleMusicPlayer();
        System.out.println("Simple music player:");
        simplePlayer.play();

        // Reproducir música con efecto de ecualización
        MusicPlayer equalizerPlayer = new EqualizerDecorator(new SimpleMusicPlayer());
        System.out.println("\nMusic player with equalizer:");
        equalizerPlayer.play();
    }
}
